const app = require('../../../app')
const request = require('supertest')
const db = require('../../../models')
const bcrypt = require('bcryptjs')

// 紀錄兩種身分的cookie以便後續API測試
let adminCookies
let userCookies

// 設定測試商品、分類資訊
const testProducts = [
  { id: 1, name: 'test_product1', categoryId: 1 },
  { id: 2, name: 'test_product2', categoryId: 1 }
]

const testCategories = [
  { id: 1, name: 'test_category1' },
  { id: 2, name: 'test_category2' }
]

// 設定新增類別資訊
const postCategory = {
  name: '零食'
}

// 設定欄位遺失的類別資訊
const invalidCategoryInfo = {}

// 設定修改類別資訊
const putCategoryInfo = {
  name: 'test_category_updated'
}

describe('Admin Category API Tests', () => {
  beforeAll(async () => {
    // 設定admin與user資訊
    const users = [
      {
        id: 1,
        name: 'admin1',
        email: 'admin1@example.com',
        password: await bcrypt.hash('123', 10),
        isAdmin: true
      },
      {
        id: 2,
        name: 'user1',
        email: 'user1@example.com',
        password: await bcrypt.hash('123', 10),
        isAdmin: false
      }
    ]

    // 從測試資料庫建立臨時admin
    await db.User.create(users[0])
    await db.User.create(users[1])

    // 模擬登入請求，使用你的 Passport 驗證策略名稱和用戶名密碼
    const [adminLoginResponse, userLoginResponse] = await Promise.all([
      request(app)
        .post('/api/signIn')
        .send({ email: 'admin1@example.com', password: '123' }),
      request(app)
        .post('/api/signIn')
        .send({ email: 'user1@example.com', password: '123' })
    ])

    // 保存cookies
    adminCookies = adminLoginResponse.headers['set-cookie']
    userCookies = userLoginResponse.headers['set-cookie']
  })

  describe('GET api/admin/categories', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)
    })

    // 成功透過API獲取所有類別資訊
    it('should return all categories if API is successful', async () => {
      const response = await request(app)
        .get('/api/admin/categories')
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data.length).toBe(testCategories.length)
      expect(response.body.data[0]).toEqual(
        expect.objectContaining(testCategories[0])
      )
      expect(response.body.data[1]).toEqual(
        expect.objectContaining(testCategories[1])
      )
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .get('/api/admin/categories')
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .get('/api/admin/categories')
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('GET api/admin/categories/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)
    })

    // 成功透過API獲取類別資訊
    it('should return specific category if API is successful', async () => {
      const response = await request(app)
        .get(`/api/admin/categories/${testProducts[0].id}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(
        expect.objectContaining(testCategories[0])
      )
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .get(`/api/admin/categories/${testProducts[0].id}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .get(`/api/admin/categories/${testProducts[0].id}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 找不到該類別
    const notExistedId = 100
    it('should return 404 NOT FOUND if category does not exist', async () => {
      const response = await request(app)
        .get(`/api/admin/categories/${notExistedId}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該類別')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('POST api/admin/categories', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)
    })

    // 成功透過API新增分類資訊
    it('should return new category if API is successful', async () => {
      const response = await request(app)
        .post('/api/admin/categories')
        .send(postCategory)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      const categoryNum = (await db.Category.findAll()).length
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining(postCategory))
      expect(categoryNum).toBe(testCategories.length + 1)
    })

    // 類別資訊欄位為空
    it('should return 400 BAD REQUEST if fields are empty', async () => {
      const response = await request(app)
        .post('/api/admin/categories')
        .send(invalidCategoryInfo)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('類別名稱欄位不能為空!')
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .post('/api/admin/categories')
        .send(postCategory)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .post('/api/admin/categories')
        .send(postCategory)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 類別名稱已註冊過
    it('should return 409 CONFLICT if category name already exists', async () => {
      const response = await request(app)
        .post('/api/admin/categories')
        .send(postCategory)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(409)

      expect(response.body.error.name).toBe('CONFLICT')
      expect(response.body.error.message).toBe('類別名稱已經註冊過!')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('PUT api/admin/products/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)
    })

    // 成功透過API修改類別資訊
    it('should return updated category if API is successful', async () => {
      const response = await request(app)
        .put(`/api/admin/categories/${testCategories[0].id}`)
        .set('Cookie', adminCookies)
        .send(putCategoryInfo)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(
        expect.objectContaining(putCategoryInfo)
      )
    })

    // 類別資訊欄位為空
    it('should return 400 BAD REQUEST if fields are empty', async () => {
      const response = await request(app)
        .put(`/api/admin/categories/${testCategories[0].id}`)
        .set('Cookie', adminCookies)
        .send(invalidCategoryInfo)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('類別名稱欄位不能為空!')
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .put(`/api/admin/categories/${testProducts[0].id}`)
        .send(putCategoryInfo)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .put(`/api/admin/categories/${testCategories[0].id}`)
        .send(putCategoryInfo)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 類別名稱已註冊過
    it('should return 409 CONFLICT if category name already exists', async () => {
      const response = await request(app)
        .put(`/api/admin/categories/${testCategories[1].id}`)
        .send(putCategoryInfo)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(409)

      expect(response.body.error.name).toBe('CONFLICT')
      expect(response.body.error.message).toBe('類別名稱已經註冊過!')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('DELETE api/admin/products/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)
    })

    it('should return status success if API is successful', async () => {
      const response = await request(app)
        .delete(`/api/admin/categories/${testCategories[0].id}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      const categoryNum = (await db.Category.findAll()).length
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining({}))
      expect(categoryNum).toBe(testCategories.length - 1)
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .delete(`/api/admin/categories/${testCategories[0].id}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .delete(`/api/admin/categories/${testCategories[0].id}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 找不到該類別
    const notExistedId = 100
    it('should return 404 NOT FOUND if category does not exist', async () => {
      const response = await request(app)
        .delete(`/api/admin/categories/${notExistedId}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該類別!')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的商品表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  afterAll(async () => {
    // 在測試開始後，清空測試資料庫中的使用者表格
    await db.User.destroy({ where: {}, truncate: { cascade: true } })
    await db.sequelize.close()
  })
})
