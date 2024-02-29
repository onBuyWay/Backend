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

// 設定新增商品資訊
const postProduct = {
  name: '可樂',
  stockQuantity: 100,
  costPrice: 10,
  sellPrice: 35,
  productStatus: true,
  categoryId: 1,
  description: '可樂超好喝'
}

// 設定欄位遺失的商品資訊
const invalidProductInfo = {
  stockQuantity: 100,
  costPrice: 10,
  sellPrice: 35,
  productStatus: true,
  categoryId: 1,
  description: '可樂超好喝'
}

// 設定修改商品資訊
const putProductInfo = {
  name: 'test_product_updated',
  stockQuantity: 100,
  costPrice: 200,
  sellPrice: 300,
  productStatus: true,
  categoryId: 2,
  description: 'description_updated'
}

describe('Admin Product API Tests', () => {
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

  describe('GET api/admin/products', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)
    })

    // 成功透過API獲取所有商品資訊
    it('should return all products if API is successful', async () => {
      const response = await request(app)
        .get('/api/admin/products')
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data.length).toBe(testProducts.length)
      expect(response.body.data[0]).toEqual(
        expect.objectContaining(testProducts[0])
      )
      expect(response.body.data[1]).toEqual(
        expect.objectContaining(testProducts[1])
      )
      expect(response.body.data[0].Category).toEqual(
        expect.objectContaining(testCategories[0])
      )
      expect(response.body.data[1].Category).toEqual(
        expect.objectContaining(testCategories[0])
      )
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .get('/api/admin/products')
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .get('/api/admin/products')
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('GET api/admin/products/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)
    })

    // 成功透過API獲取商品資訊
    it('should return specific product if API is successful', async () => {
      const response = await request(app)
        .get(`/api/admin/products/${testProducts[0].id}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(
        expect.objectContaining(testProducts[0])
      )
      expect(response.body.data.Category).toEqual(
        expect.objectContaining(testCategories[0])
      )
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .get(`/api/admin/products/${testProducts[0].id}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .get(`/api/admin/products/${testProducts[0].id}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 找不到該商品
    const notExistedId = 100
    it('should return 404 NOT FOUND if product does not exist', async () => {
      const response = await request(app)
        .get(`/api/admin/products/${notExistedId}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該商品')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('POST api/admin/products', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)
    })

    // 成功透過API新增商品資訊
    it('should return new product if API is successful', async () => {
      const response = await request(app)
        .post('/api/admin/products')
        .send(postProduct)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      const productNum = (await db.Product.findAll()).length
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining(postProduct))
      expect(productNum).toBe(testProducts.length + 1)
    })

    // 商品資訊欄位為空
    it('should return 400 BAD REQUEST if fields are empty except image', async () => {
      const response = await request(app)
        .post('/api/admin/products')
        .send(invalidProductInfo)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('商品資訊欄位不能為空!')
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .post('/api/admin/products')
        .send(postProduct)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .post('/api/admin/products')
        .send(postProduct)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 商品名稱已註冊過
    it('should return 409 CONFLICT if product name already exists', async () => {
      const response = await request(app)
        .post('/api/admin/products')
        .send(postProduct)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(409)

      expect(response.body.error.name).toBe('CONFLICT')
      expect(response.body.error.message).toBe('商品名稱已經註冊過!')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('PUT api/admin/products/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)
    })

    // 成功透過API修改商品資訊
    it('should return updated product if API is successful', async () => {
      const response = await request(app)
        .put(`/api/admin/products/${testProducts[0].id}`)
        .set('Cookie', adminCookies)
        .send(putProductInfo)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(
        expect.objectContaining(putProductInfo)
      )
    })

    // 商品資訊欄位為空
    it('should return 400 BAD REQUEST if fields are empty except image', async () => {
      const response = await request(app)
        .put(`/api/admin/products/${testProducts[0].id}`)
        .set('Cookie', adminCookies)
        .send(invalidProductInfo)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('商品資訊欄位不能為空!')
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .put(`/api/admin/products/${testProducts[0].id}`)
        .send(putProductInfo)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .put(`/api/admin/products/${testProducts[0].id}`)
        .send(putProductInfo)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 商品名稱已註冊過
    it('should return 409 CONFLICT if product name already exists', async () => {
      const response = await request(app)
        .put(`/api/admin/products/${testProducts[1].id}`)
        .send(putProductInfo)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(409)

      expect(response.body.error.name).toBe('CONFLICT')
      expect(response.body.error.message).toBe('商品名稱已經註冊過!')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('DELETE api/admin/products/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)
    })

    // 成功透過API刪除商品資訊
    it('should return status success if API is successful', async () => {
      const response = await request(app)
        .delete(`/api/admin/products/${testProducts[0].id}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      const productNum = (await db.Product.findAll()).length
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining({}))
      expect(productNum).toBe(testProducts.length - 1)
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .delete(`/api/admin/products/${testProducts[0].id}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .delete(`/api/admin/products/${testProducts[0].id}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 找不到該商品
    const notExistedId = 100
    it('should return 404 NOT FOUND if product does not exist', async () => {
      const response = await request(app)
        .delete(`/api/admin/products/${notExistedId}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該商品!')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在測試開始後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  afterAll(async () => {
    // 在測試開始後，清空測試資料庫中的使用者表格
    await db.User.destroy({ where: {}, truncate: { cascade: true } })
    await db.sequelize.close()
  })
})
