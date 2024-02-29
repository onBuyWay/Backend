const app = require('../../app')
const request = require('supertest')
const db = require('../../models')
const bcrypt = require('bcryptjs')

// 紀錄user身分的cookie以便後續API測試
let userCookies
let existUserId
let existUser

// 設定使用者資訊
const signUpUser = {
  name: 'signUp_user1',
  email: 'signUp_email1',
  password: 'signUp_password1',
  passwordCheck: 'signUp_password1'
}

// 設定欄位遺失的註冊資訊
const invalidSignUp = {
  name: 'signUp_user2',
  email: '',
  password: 'signUp_password2',
  passwordCheck: 'signUp_password1'
}

// 註冊資訊(密碼驗證未通過)
const invalidCheck = {
  name: 'signUp_user2',
  email: 'signUp_email2',
  password: 'signUp_password2',
  passwordCheck: 'invalidCheck'
}

// 註冊資訊(email已被註冊)
const conflictUser = {
  name: 'signUp_user3',
  email: 'signUp_email1',
  password: 'signUp_password3',
  passwordCheck: 'signUp_password3'
}

// 使用者登入資訊
const signInUser = {
  email: 'user2@example.com',
  password: '123'
}

// 不合法的登入資訊(email)
const invalidEmailSignIn = {
  email: 'wrongEmail@example.com',
  password: '123'
}

// 不合法的登入資訊(password)
const invalidPasswordSignIn = {
  email: 'user2@example.com',
  password: 'wrongPassword'
}

// 使用者更改資訊
const putUserInfo = {
  name: 'updatedName',
  birthday: '1992-05-26',
  phone: '0958280647',
  gender: 'updatedGender',
  address: 'updatedAddress'
}

// 不合法使用者更改資訊(name)
const inValidPutUserInfo = {
  name: '',
  birthday: '1992-05-26',
  phone: '0958280647',
  gender: 'updatedGender',
  address: 'updatedAddress'
}

const putSameNameUserInfo = {
  name: 'user2'
}

// 設定測試商品
const testProducts = [
  {
    id: 1,
    name: '可樂'
  },
  {
    id: 2,
    name: '舒跑'
  },
  {
    id: 3,
    name: '洋芋片'
  },
  {
    id: 4,
    name: '口香糖'
  }
]

// 設定測試最愛商品
const testFavorites = [
  {
    userId: 1,
    productId: testProducts[0].id
  },
  {
    userId: 1,
    productId: testProducts[3].id
  }
]

const postFavorite = {
  userId: 1,
  productId: testProducts[1].id
}

describe('User API Tests', () => {
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

    //設定要測試的user id
    existUserId = 1

    // 設定要測試的user
    existUser = users[0]

    // 從測試資料庫建立臨時admin
    await db.User.bulkCreate(users)

    // 模擬登入請求，使用你的 Passport 驗證策略名稱和用戶名密碼
    const userLoginResponse = await request(app)
      .post('/api/signIn')
      .send({ email: 'user1@example.com', password: '123' })

    // 保存cookies
    userCookies = userLoginResponse.headers['set-cookie']
  })

  describe('POST api/signUp', () => {
    // 成功透過API註冊
    it('should return new user if API is successful', async () => {
      const response = await request(app)
        .post('/api/signUp')
        .send(signUpUser)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data.email).toBe(signUpUser.email)
      expect(response.body.data.name).toBe(signUpUser.name)
    })

    // 註冊欄位為空
    it('should return 400 BAD REQUEST if name, email or password is empty', async () => {
      const response = await request(app)
        .post('/api/signUp')
        .send(invalidSignUp)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('帳號、密碼、姓名欄位不能為空!')
    })

    // 密碼驗證未通過
    it('should return a 400 BAD REQUEST when the password check fail.', async () => {
      const response = await request(app)
        .post('/api/signUp')
        .send(invalidCheck)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('密碼驗證未通過!')
    })

    // email已被註冊
    it('should return 409 CONFLICT if email is exist', async () => {
      const response = await request(app)
        .post('/api/signUp')
        .send(conflictUser)
        .expect('Content-Type', /json/)
        .expect(409)

      expect(response.body.error.name).toBe('CONFLICT')
      expect(response.body.error.message).toBe('eamil已經註冊過!')
    })
  })

  describe('POST api/signIn', () => {
    // 成功透過API登入
    it('should return signIn user info if API is successful', async () => {
      const response = await request(app)
        .post('/api/signIn')
        .send(signInUser)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data.email).toBe(signInUser.email)
    })

    // 登入帳號錯誤
    it('should return 401 Unauthorized if email is wrong', async () => {
      const response = await request(app)
        .post('/api/signIn')
        .send(invalidEmailSignIn)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('帳號或是密碼錯誤')
    })

    // 登入密碼錯誤
    it('should return 401 Unauthorized if password is wrong', async () => {
      const response = await request(app)
        .post('/api/signIn')
        .send(invalidPasswordSignIn)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('帳號或是密碼錯誤')
    })
  })

  describe('GET api/users/:id', () => {
    // 成功透過API獲取當前使用者資訊
    it('should return current user info if API is successful', async () => {
      const response = await request(app)
        .get(`/api/users/${existUserId}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining(existUser))
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .get(`/api/users/${existUserId}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 找不到該使用者
    it('should return 404 NOT FOUND if user does not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .get(`/api/users/${notExistedId}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該使用者')
    })
  })

  describe('PUT api/users/:id', () => {
    // 成功透過API修改當前使用者資訊
    it('should return updated user info if API is successful', async () => {
      const response = await request(app)
        .put(`/api/users/${existUserId}`)
        .set('Cookie', userCookies)
        .send(putUserInfo)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining(putUserInfo))
    })

    // 使用者姓名欄位為空
    it('should return 400 BAD REQUEST if name field is empty', async () => {
      const response = await request(app)
        .put(`/api/users/${existUserId}`)
        .set('Cookie', userCookies)
        .send(inValidPutUserInfo)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.error.name).toBe('BAD REQUEST')
      expect(response.body.error.message).toBe('姓名欄位不能為空!')
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const response = await request(app)
        .put(`/api/users/${existUserId}`)
        .send(putUserInfo)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 找不到使用者資訊
    it('should return 404 NOT FOUND if user does not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .put(`/api/users/${notExistedId}`)
        .send(putUserInfo)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該使用者!')
    })

    // 使用者名稱已註冊
    it('should return 409 CONFLICT if user name already exists', async () => {
      const response = await request(app)
        .put(`/api/users/${existUserId}`)
        .send(putSameNameUserInfo)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(409)

      expect(response.body.error.name).toBe('CONFLICT')
      expect(response.body.error.message).toBe('使用者名稱已經註冊過!')
    })
  })

  describe('POST api/favorites/:productId', () => {
    beforeAll(async () => {
      try {
        // 在所有測試開始前，清空測試資料庫中的最愛表格
        await db.Favorite.destroy({ where: {}, truncate: { cascade: true } })

        // 在所有測試開始前，清空測試資料庫中的商品表格
        await db.Product.destroy({ where: {}, truncate: { cascade: true } })

        // 生成測試最愛資訊
        await db.Product.bulkCreate(testProducts)

        // 生成測試最愛資訊
        await db.Favorite.bulkCreate(testFavorites)
      }catch(err) {
        console.log(err)
      }
    })

    // 成功將商品新增至最愛
    it('should return new favorite product if API is successful', async () => {
      const favoritedProductId = testProducts[1].id
      const response = await request(app)
        .post(`/api/favorites/${favoritedProductId}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      const favoriteNum = (await db.Favorite.findAll()).length
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining(postFavorite))
      expect(favoriteNum).toBe(testFavorites.length + 1)
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const favoritedProductId = testProducts[3].id
      const response = await request(app)
        .post(`/api/favorites/${favoritedProductId}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 找不到該商品
    it('should return 404 NOT FOUND if category does not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .post(`/api/favorites/${notExistedId}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('找不到該商品')
    })

    // 商品已在最愛名單中
    it('should return 409 CONFLICT if product already in favorites', async () => {
      const response = await request(app)
        .post(`/api/favorites/${testFavorites[0].productId}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(409)

      expect(response.body.error.name).toBe('CONFLICT')
      expect(response.body.error.message).toBe('已加入最愛名單中!')
    })

    afterAll(async () => {
      // 在所有測試後，清空測試資料庫中的最愛表格
      await db.Favorite.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  describe('DELETE api/favorites/:productId', () => {
    beforeAll(async () => {
      try{
        // 在所有測試開始前，清空測試資料庫中的最愛表格
        await db.Favorite.destroy({ where: {}, truncate: { cascade: true } })

        // 在所有測試開始前，清空測試資料庫中的商品表格
        await db.Product.destroy({ where: {}, truncate: { cascade: true } })

        // 生成測試最愛資訊
        await db.Product.bulkCreate(testProducts)

        // 生成測試最愛資訊
        await db.Favorite.bulkCreate(testFavorites)
      }catch(err) {
        console.log(err)
      }
    })

    // 成功將商品從最愛中移除
    it('should return status success if API is successful', async () => {
      const DeleteProductId = testProducts[3].id
      const response = await request(app)
        .delete(`/api/favorites/${DeleteProductId}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(200)

      const favoriteNum = (await db.Favorite.findAll()).length
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual(expect.objectContaining({}))
      expect(favoriteNum).toBe(testFavorites.length - 1)
    })

    // 尚未登入
    it('should return 401 Unauthorized if user not signIn', async () => {
      const favoritedProductId = testProducts[3].id
      const response = await request(app)
        .delete(`/api/favorites/${favoritedProductId}`)
        .expect('Content-Type', /json/)
        .expect(401)

      expect(response.body.error.name).toBe('Unauthorized')
      expect(response.body.error.message).toBe('使用者未登入!')
    })

    // 找不到該商品
    it('should return 404 NOT FOUND if category does not exist', async () => {
      const notExistedId = 100
      const response = await request(app)
        .delete(`/api/favorites/${notExistedId}`)
        .set('Cookie', userCookies)
        .expect('Content-Type', /json/)
        .expect(404)

      expect(response.body.error.name).toBe('NOT FOUND')
      expect(response.body.error.message).toBe('該商品不在最愛名單中')
    })

    afterAll(async () => {
      // 在所有測試後，清空測試資料庫中的最愛表格
      await db.Favorite.destroy({ where: {}, truncate: { cascade: true } })

      // 在所有測試後，清空測試資料庫中的商品表格
      await db.Product.destroy({ where: {}, truncate: { cascade: true } })
    })
  })

  afterAll(async () => {
    // 在測試開始後，清空測試資料庫中的使用者表格
    await db.User.destroy({ where: {}, truncate: { cascade: true } })
    await db.sequelize.close()
  })
})
