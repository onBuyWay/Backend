const app = require('../../app')
const request = require('supertest')
const db = require('../../models')
const bcrypt = require('bcryptjs')

// 紀錄cookie以便後續API測試
let userCookies

// 設定測試商品資訊
const testProducts = [
  {
    id: 1,
    name: 'test_product1',
    categoryId: 1,
    stockQuantity: 100,
    costPrice: 10,
    sellPrice: 20,
    description: 'test_description1'
  },
  {
    id: 2,
    name: 'test_product2',
    categoryId: 1,
    stockQuantity: 200,
    costPrice: 20,
    sellPrice: 30,
    description: 'test_description2'
  },
  {
    id: 3,
    name: 'test_product3',
    categoryId: 2,
    stockQuantity: 300,
    costPrice: 30,
    sellPrice: 40,
    description: 'test_description3'
  }
]

// 設定測試類別資訊
const testCategories = [
  { id: 1, name: 'test_category1' },
  { id: 2, name: 'test_category2' }
]

// 設定最愛關聯
const testFavorites = [
  {
    userId: 1,
    productId: 1
  },
  {
    userId: 1,
    productId: 2
  },
  {
    userId: 1,
    productId: 3
  },
  {
    userId: 2,
    productId: 1
  },
  {
    userId: 2,
    productId: 3
  }
]

describe('product API tests', () => {
  beforeAll(async () => {
    // 設定admin與user資訊
    const users = [
      {
        id: 1,
        name: 'user1',
        email: 'user1@example.com',
        password: await bcrypt.hash('123', 10),
        isAdmin: false
      },
      {
        id: 2,
        name: 'user2',
        email: 'user2@example.com',
        password: await bcrypt.hash('123', 10),
        isAdmin: false
      }
    ]

    // 從測試資料庫建立臨時user
    await db.User.bulkCreate(users)

    // 模擬登入請求，使用你的 Passport 驗證策略名稱和用戶名密碼
    const userLoginResponse = await request(app)
      .post('/api/signIn')
      .send({ email: 'user1@example.com', password: '123' })

    // 保存cookies
    userCookies = userLoginResponse.headers['set-cookie']
  })

  describe('GET api/products', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的訂單物品表格
      await db.Favorite.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試訂單資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試最愛資訊
      await db.Favorite.bulkCreate(testFavorites)
    })

    // 成功透過API獲取所有訂單資訊
    it('should return all products if API is successful', async () => {
      const response = await request(app)
        .get('/api/products')
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data.length).toBe(testProducts.length)
      const favoritedProductsId =
        testFavorites && testFavorites.map((f) => f.productId)
      for (let i = 0; i < testProducts.length; i++) {
        const userId = 1
        const isFavorited = favoritedProductsId.includes(testProducts[i].id)
        const categoryInfo = testCategories.find(
          (catObj) => catObj.id === testProducts[i].categoryId
        )
        const numOfFavorite = testFavorites.filter(
          (favorite) => favorite.userId === userId
        ).length

        expect(response.body.data[i]).toEqual(
          expect.objectContaining(testProducts[i])
        )
        expect(response.body.data[i].Category).toEqual(
          expect.objectContaining(categoryInfo)
        )
        expect(response.body.data[i].numOfFavorite).toBe(numOfFavorite)
        expect(response.body.data[i].isFavorited).toBe(isFavorited)
      }
    })
    afterAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的訂單物品表格
      await db.Favorite.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('GET api/products/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的訂單物品表格
      await db.Favorite.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試訂單資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試最愛資訊
      await db.Favorite.bulkCreate(testFavorites)
    })

    // 成功透過API獲取訂單資訊
    it('should return specific product if API is successful', async () => {
      const response = await request(app)
        .get(`/api/products/${testProducts[0].id}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      const specificProduct = testProducts.find(
        (product) => product.id === testProducts[0].id
      )
      const categoryInfo = testCategories.find(
        (catObj) => catObj.id === testProducts[0].categoryId
      )
      const isFavorited = testFavorites.some(
        (favorite) => favorite.productId === specificProduct.id
      )
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(
        expect.objectContaining(specificProduct)
      )
      expect(response.body.data.Category).toEqual(
        expect.objectContaining(categoryInfo)
      )
      expect(response.body.data.isFavorited).toBe(isFavorited)
    })

    // 找不到該商品
    it('should return 404 NOT FOUND if product does not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .get(`/api/products/${notExistedId}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該商品')
    })
  })

  afterAll(async () => {
    // 在測試開始後，清空測試資料庫中的使用者表格
    await db.User.destroy({ where: {}, truncate: { cascade: true } })
    await db.sequelize.close()
  })
})
