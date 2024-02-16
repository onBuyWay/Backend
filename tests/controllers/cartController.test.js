const app = require('../../app')
const request = require('supertest')
const db = require('../../models')
const bcrypt = require('bcryptjs')

// 紀錄cookie以便後續API測試
let userCookies1
let userCookies2

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
  },
  // Out of stock
  {
    id: 4,
    name: 'test_product4',
    categoryId: 2,
    stockQuantity: 0,
    costPrice: 40,
    sellPrice: 50,
    description: 'test_description4'
  },
  {
    id: 5,
    name: 'test_product5',
    categoryId: 2,
    stockQuantity: 1,
    costPrice: 50,
    sellPrice: 60,
    description: 'test_description5'
  }
]

// 設定測試類別資訊
const testCategories = [
  { id: 1, name: 'test_category1' },
  { id: 2, name: 'test_category2' }
]

// 設定測試購物車資訊
const testCarts = [
  {
    id: 1,
    userId: 1
  },
  {
    id: 2,
    userId: 2
  }
]

// 設定測試購物車商品資訊 (only have user1's cartItem)
const testCartItems = [
  {
    id: 1,
    quantity: 1,
    cartId: 1,
    productId: 1
  },
  {
    id: 2,
    quantity: 3,
    cartId: 1,
    productId: 3
  },
  {
    id: 3,
    quantity: 1,
    cartId: 1,
    productId: 5
  }
]

describe('cart API tests', () => {
  beforeAll(async () => {
    // 設定user資訊
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

    // 確保模型與資料庫的同步
    await db.sequelize.sync({ force: true })

    // 從測試資料庫建立臨時users
    await db.User.bulkCreate(users)

    // 模擬登入請求，使用你的 Passport 驗證策略名稱和用戶名密碼
    const [userLoginResponse1, userLoginResponse2] = await Promise.all([
      request(app)
        .post('/api/signIn')
        .send({ email: 'user1@example.com', password: '123' }),
      request(app)
        .post('/api/signIn')
        .send({ email: 'user2@example.com', password: '123' })
    ])

    // 保存cookies
    userCookies1 = userLoginResponse1.headers['set-cookie']
    userCookies2 = userLoginResponse2.headers['set-cookie']
  })

  describe('GET api/cart', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試購物車資訊
      await db.Cart.bulkCreate(testCarts)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試購物車商品資訊
      await db.CartItem.bulkCreate(testCartItems)
    })
    // 成功透過API獲取購物車資訊
    it('should return user cart if API is successful', async () => {
      const response = await request(app)
        .get(`/api/cart`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(200)

      const expectCartProducts = [
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
          id: 3,
          name: 'test_product3',
          categoryId: 2,
          stockQuantity: 300,
          costPrice: 30,
          sellPrice: 40,
          description: 'test_description3'
        },
        {
          id: 5,
          name: 'test_product5',
          categoryId: 2,
          stockQuantity: 1,
          costPrice: 50,
          sellPrice: 60,
          description: 'test_description5'
        }
      ]

      const expectTotalPrice = 200

      expect(response.body.status).toBe('success')
      expect(response.body.data.totalPrice).toBe(expectTotalPrice)
      for (let i = 0; i < testCartItems; i++) {
        expect(response.body.data.cartProducts[i]).toEqual(
          expect.objectContaining(expectCartProducts[i])
        )
      }
    })

    // 成功透過API獲取購物車資訊(購物車是空的)
    it('should return user cart if API is successful', async () => {
      const response = await request(app)
        .get(`/api/cart`)
        .set('Cookie', userCookies2)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.message).toBe('目前購物車中沒有商品~')
    })

    // 使用者未登入
    it('should return empty cart if API is successful', async () => {
      const response = await request(app)
        .get(`/api/cart`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    afterAll(async () => {
      // 在所有測試後，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('POST api/cart/:productId', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試購物車資訊
      await db.Cart.bulkCreate(testCarts)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試購物車商品資訊
      await db.CartItem.bulkCreate(testCartItems)
    })

    // 成功透過API將商品新增至購物車
    it('should return cartItem info if API is successful', async () => {
      const response = await request(app)
        .post(`/api/cart/${testProducts[1].id}`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(200)

      const expectCartItem = {
        quantity: 1,
        cartId: 1,
        productId: testProducts[1].id
      }

      expect(response.body.data.cartItem).toEqual(
        expect.objectContaining(expectCartItem)
      )
      expect(response.body.data.addProduct).toEqual(
        expect.objectContaining(testProducts[1])
      )
    })

    // 成功透過API將已存在商品數量+1
    it('should return existed cartItem info if API is successful', async () => {
      const response = await request(app)
        .post(`/api/cart/${testProducts[0].id}`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(200)

      const expectCartItem = {
        ...testCartItems[0],
        quantity: 2
      }

      expect(response.body.data.cartItem).toEqual(
        expect.objectContaining(expectCartItem)
      )
      expect(response.body.data.addProduct).toEqual(
        expect.objectContaining(testProducts[0])
      )
    })

    it('should return empty cart if API is successful', async () => {
      const response = await request(app)
        .post(`/api/cart/${testProducts[0].id}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 欲加入購物車的商品庫存不足
    it('should return 404 NOT FOUND if product is out of stock', async () => {
      const response = await request(app)
        .post(`/api/cart/${testProducts[3].id}`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('Not Found')
      expect(response.body.error.message).toBe('商品庫存不足')
    })

    // 已加入購物車的商品庫存不足
    it('should return 404 NOT FOUND if existed product is out of stock', async () => {
      const response = await request(app)
        .post(`/api/cart/${testProducts[4].id}`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('Not Found')
      expect(response.body.error.message).toBe('商品庫存不足')
    })

    afterAll(async () => {
      // 在所有測試後，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('POST api/cartItems/:cartItemId/add', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試購物車資訊
      await db.Cart.bulkCreate(testCarts)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試購物車商品資訊
      await db.CartItem.bulkCreate(testCartItems)
    })

    // 成功透過API將購物車商品數量+1
    it('should return specific cartItem info if API is successful', async () => {
      const response = await request(app)
        .post(`/api/cartItems/${testCartItems[0].id}/add`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(200)

      const expectCartItem = {
        ...testCartItems[0],
        quantity: 2
      }

      expect(response.body.status).toBe('success')
      expect(response.body.data.cartItem).toEqual(
        expect.objectContaining(expectCartItem)
      )
    })

    // 使用者未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .post(`/api/cartItems/${testCartItems[0].id}/add`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 找不到購物車商品
    it('should return 404 NOT FOUND if cartItem is not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .post(`/api/cartItems/${notExistedId}/add`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該商品')
    })

    // 購物車商品庫存不足
    it('should return 404 NOT FOUND if product is out of stock', async () => {
      const response = await request(app)
        .post(`/api/cartItems/${testCartItems[2].id}/add`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('商品庫存不足')
    })

    afterAll(async () => {
      // 在所有測試後，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('POST api/cartItems/:cartItemId/sub', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試購物車資訊
      await db.Cart.bulkCreate(testCarts)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試購物車商品資訊
      await db.CartItem.bulkCreate(testCartItems)
    })

    // 成功透過API將購物車商品數量-1
    it('should return specific cartItem info if API is successful', async () => {
      const response = await request(app)
        .post(`/api/cartItems/${testCartItems[1].id}/sub`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(200)

      const expectCartItem = {
        ...testCartItems[1],
        quantity: 2
      }

      expect(response.body.status).toBe('success')
      expect(response.body.data.cartItem).toEqual(
        expect.objectContaining(expectCartItem)
      )
    })

    // 使用者未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .post(`/api/cartItems/${testCartItems[1].id}/sub`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 找不到購物車商品
    it('should return 404 NOT FOUND if cartItem is not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .post(`/api/cartItems/${notExistedId}/sub`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該商品')
    })

    afterAll(async () => {
      // 在所有測試後，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('DELETE api/cartItems/:cartItemId', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試購物車資訊
      await db.Cart.bulkCreate(testCarts)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試購物車商品資訊
      await db.CartItem.bulkCreate(testCartItems)
    })

    it('should return success status if specific cartItem has been deleted', async () => {
      const response = await request(app)
        .delete(`/api/cartItems/${testCartItems[0].id}`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(200)

      const cartItemNum = (await db.CartItem.findAll()).length
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining({}))
      expect(cartItemNum).toBe(testCartItems.length - 1)
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .delete(`/api/cartItems/${testCartItems[0].id}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 找不到該類別
    it('should return 404 NOT FOUND if category does not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .delete(`/api/cartItems/${notExistedId}`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該商品')
    })

    afterAll(async () => {
      // 在所有測試後，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('GET api/cart/check', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試購物車資訊
      await db.Cart.bulkCreate(testCarts)

      // 生成測試商品資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試購物車商品資訊
      await db.CartItem.bulkCreate(testCartItems)
    })
    // 成功透過API獲取購物車資訊
    it('should return user cart if API is successful', async () => {
      const response = await request(app)
        .get(`/api/cart/check`)
        .set('Cookie', userCookies1)
        .expect('Content-Type', /json/)
        .expect(200)

      const expectCartProducts = [
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
          id: 3,
          name: 'test_product3',
          categoryId: 2,
          stockQuantity: 300,
          costPrice: 30,
          sellPrice: 40,
          description: 'test_description3'
        },
        {
          id: 5,
          name: 'test_product5',
          categoryId: 2,
          stockQuantity: 1,
          costPrice: 50,
          sellPrice: 60,
          description: 'test_description5'
        }
      ]

      const expectTotalPrice = 200

      expect(response.body.status).toBe('success')
      expect(response.body.data.totalPrice).toBe(expectTotalPrice)
      for (let i = 0; i < testCartItems; i++) {
        expect(response.body.data.cartProducts[i]).toEqual(
          expect.objectContaining(expectCartProducts[i])
        )
      }
    })

    // 購物車為空
    it('should return 400 BAD REQUEST if user cart is empty', async () => {
      const response = await request(app)
        .get(`/api/cart/check`)
        .set('Cookie', userCookies2)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe(
        '購物車中沒有商品，無法送出訂單。'
      )
    })

    // 使用者未登入
    it('should return empty cart if API is successful', async () => {
      const response = await request(app)
        .get(`/api/cart/check`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    afterAll(async () => {
      // 在所有測試後，清空測試資料庫中的購物車商品表格
      await db.CartItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的購物車表格
      await db.Cart.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的類別表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  afterAll(async () => {
    // 在測試開始後，清空測試資料庫中的使用者表格
    await db.User.destroy({ where: {}, truncate: { cascade: true } })
    await db.sequelize.close()
  })
})
