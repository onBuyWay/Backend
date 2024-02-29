const app = require('../../../app')
const request = require('supertest')
const db = require('../../../models')
const bcrypt = require('bcryptjs')

// 紀錄兩種身分的cookie以便後續API測試
let adminCookies
let userCookies

// 設定測試訂單資訊
const testOrders = [
  {
    id: 1,
    userId: 2,
    amount: 1000,
    name: 'test_name1',
    phone: 'test_phone1',
    address: 'test_address1',
    paymentStatus: '未付款',
    shippingStatus: '待出貨'
  },
  {
    id: 2,
    userId: 2,
    amount: 2000,
    name: 'test_name2',
    phone: 'test_phone2',
    address: 'test_address2',
    paymentStatus: '已付款',
    shippingStatus: '已出貨'
  },
  {
    id: 3,
    userId: 2,
    amount: 3000,
    name: 'test_name3',
    phone: 'test_phone3',
    address: 'test_address3',
    paymentStatus: '已取消',
    shippingStatus: '已取消'
  }
]

// 設定測試商品資訊
const testProducts = [
  { id: 1, name: 'test_product1', categoryId: 1, price: 100 },
  { id: 2, name: 'test_product2', categoryId: 1, price: 200 }
]

// 設定測試類別資訊
const testCategories = [
  { id: 1, name: 'test_category1' },
  { id: 2, name: 'test_category2' }
]

// 設定訂單與商品關聯
const testOrderItems = [
  {
    productId: 1,
    orderId: 1,
    quantity: 1
  },
  {
    productId: 2,
    orderId: 1,
    quantity: 2
  }
]

// 設定修改訂單資訊
const putOrderInfo = {
  paymentStatus: '已付款',
  shippingStatus: '已出貨'
}

// 設定不合法修改訂單資訊(missing paymentStatus)
const invalidPutOrderInfo1 = {
  shippingStatus: '已出貨'
}

// 設定不合法修改訂單資訊(missing shippingStatus)
const invalidPutOrderInfo2 = {
  paymentStatus: '已付款'
}

describe('Admin Order API Tests', () => {
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

  describe('GET api/admin/orders', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的訂單表格
      await db.Order.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試訂單資訊
      await db.Order.bulkCreate(testOrders)
    })

    // 成功透過API獲取所有訂單資訊
    it('should return all orders if API is successful', async () => {
      const response = await request(app)
        .get('/api/admin/orders')
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data.length).toBe(testOrders.length)
      expect(response.body.data[0]).toEqual(
        expect.objectContaining(testOrders[0])
      )
      expect(response.body.data[1]).toEqual(
        expect.objectContaining(testOrders[1])
      )
      expect(response.body.data[2]).toEqual(
        expect.objectContaining(testOrders[2])
      )
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .get('/api/admin/orders')
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .get('/api/admin/orders')
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })
    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的訂單表格
      await db.Order.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('GET api/admin/orders/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的訂單物品表格
      await db.OrderItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的訂單物品表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的訂單表格
      await db.Order.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試訂單資訊
      await db.Order.bulkCreate(testOrders)

      // 生成測試類別資訊
      await db.Category.bulkCreate(testCategories)

      // 生成測試訂單資訊
      await db.Product.bulkCreate(testProducts)

      // 生成測試訂單物品資訊
      await db.OrderItem.bulkCreate(testOrderItems)
    })

    // 成功透過API獲取訂單資訊
    it('should return specific order if API is successful', async () => {
      const response = await request(app)
        .get(`/api/admin/orders/${testOrders[0].id}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining(testOrders[0]))
      for (let i = 0; i < testOrderItems; i++) {
        expect(response.body.data.orderProducts[i]).toEqual(
          expect.objectContaining(testProducts[i])
        )
        expect(response.body.data.orderProducts[i].OrderItem).toEqual(
          expect.objectContaining(testOrderItems[i])
        )
      }
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .get(`/api/admin/orders/${testOrders[0].id}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .get(`/api/admin/orders/${testOrders[0].id}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 找不到該訂單
    it('should return 404 NOT FOUND if product does not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .get(`/api/admin/products/${notExistedId}`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該商品')
    })
    afterAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的訂單物品表格
      await db.OrderItem.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的訂單表格
      await db.Category.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試開始前，清空測試資料庫中的訂單表格
      await db.Order.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('PUT api/admin/orders/:id', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的訂單表格
      await db.Order.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試訂單資訊
      await db.Order.bulkCreate(testOrders)
    })

    // 成功透過API修改訂單資訊
    it('should return updated order if API is successful', async () => {
      const response = await request(app)
        .put(`/api/admin/orders/${testOrders[0].id}`)
        .set('Cookie', adminCookies)
        .send(putOrderInfo)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.message).toBe('成功修改訂單資訊')
      expect(response.body.data).toEqual(expect.objectContaining(putOrderInfo))
    })

    // 訂單付款資訊欄位為空
    it('should return 400 BAD REQUEST if paymentStatus is empty', async () => {
      const response = await request(app)
        .put(`/api/admin/orders/${testOrders[0].id}`)
        .set('Cookie', adminCookies)
        .send(invalidPutOrderInfo1)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('請選擇欲修改狀態')
    })

    // 訂單付款資訊欄位為空
    it('should return 400 BAD REQUEST if paymentStatus is empty', async () => {
      const response = await request(app)
        .put(`/api/admin/orders/${testOrders[0].id}`)
        .set('Cookie', adminCookies)
        .send(invalidPutOrderInfo2)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('請選擇欲修改狀態')
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .put(`/api/admin/orders/${testOrders[0].id}`)
        .send(putOrderInfo)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .put(`/api/admin/products/${testProducts[0].id}`)
        .send(putOrderInfo)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    afterAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的訂單表格
      await db.Order.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('PUT api/admin/orders/:orderId/cancel', () => {
    beforeAll(async () => {
      // 在所有測試開始前，清空測試資料庫中的訂單表格
      await db.Order.destroy({ where: {}, truncate: { cascade: true } })

      // 生成測試訂單資訊
      await db.Order.bulkCreate(testOrders)
    })

    // 成功透過API取消訂單資訊
    it('should return status success if API is successful', async () => {
      const response = await request(app)
        .put(`/api/admin/orders/${testOrders[1].id}/cancel`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.message).toBe(`成功取消#${testOrders[1].id}的訂單`)
      expect(response.body.data.paymentStatus).toBe('已取消')
      expect(response.body.data.shippingStatus).toBe('已取消')
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .put(`/api/admin/orders/${testOrders[1].id}/cancel`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 不符合權限
    it('should return 401 Unauthorized if user is not admin', async () => {
      const response = await request(app)
        .put(`/api/admin/orders/${testOrders[1].id}/cancel`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('未獲得使用權限!')
    })

    // 找不到該商品
    it('should return 404 NOT FOUND if product does not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .put(`/api/admin/orders/${notExistedId}/cancel`)
        .set('Cookie', adminCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該訂單')
    })

    afterAll(async () => {
      // 在測試開始後，清空測試資料庫中的商品表格
      await db.Order.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  afterAll(async () => {
    // 在測試開始後，清空測試資料庫中的使用者表格
    await db.User.destroy({ where: {}, truncate: { cascade: true } })
    await db.sequelize.close()
  })
})
