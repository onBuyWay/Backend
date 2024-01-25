const bcrypt = require('bcryptjs')
const { User, Favorite, Product } = require('../../models')
const APIError = require('../../class/errors/APIError')
const httpStatusCodes = require('../../httpStatusCodes')

const userController = {
  signUp: (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return next(
        new APIError(
          'BAD REQUEST',
          httpStatusCodes.BAD_REQUEST,
          '帳號、密碼、姓名欄位不能為空!'
        )
      )
    }
    // 密碼驗證錯誤
    if (req.body.password !== req.body.passwordCheck) {
      return next(
        new APIError(
          'BAD REQUEST',
          httpStatusCodes.BAD_REQUEST,
          '密碼驗證未通過!'
        )
      )
    }
    return User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        // 帳戶已存在
        if (user) {
          return next(
            new APIError(
              'CONFLICT',
              httpStatusCodes.CONFLICT,
              'eamil已經註冊過!'
            )
          )
        }
        return bcrypt.hash(req.body.password, 10)
      })
      .then((hash) => {
        // 成功建立一般user
        const userData = { ...req.body, password: hash, isAdmin: false }
        return User.create(userData).then((newUser) => {
          res.json({ status: 'success', data: newUser })
        })
      })
      .catch((err) => next(err))
  },
  signIn: (req, res, next) => {
    return res.json({ status: 'success', data: req.user })
  },
  getUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id)
      // 資料庫找不到使用者
      if (!user)
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該使用者')
        )
      // 回傳使用者資訊
      return res.json({ status: 'success', data: user.toJSON() })
    } catch (err) {
      next(err)
    }
  },
  putUser: async (req, res, next) => {
    // 獲取表單資訊
    const formData = { ...req.body }

    // 名稱欄位不能為空
    if (!formData.name) {
      return next(
        new APIError(
          'BAD REQUEST',
          httpStatusCodes.BAD_REQUEST,
          '姓名欄位不能為空!'
        )
      )
    }

    // 更新姓名、電話、性別、地址、生日
    try {
      const [selectedUser, sameNameUser] = await Promise.all([
        User.findByPk(req.params.id),
        User.findOne({ where: { name: formData.name } })
      ])

      // 找不到該使用者
      if (!selectedUser) {
        return next(
          new APIError(
            'NOT FOUND',
            httpStatusCodes.NOT_FOUND,
            '找不到該使用者!'
          )
        )
      }

      // 類別名稱重複
      if (sameNameUser && selectedUser.id !== sameNameUser.id) {
        return next(
          new APIError(
            'CONFLICT',
            httpStatusCodes.CONFLICT,
            '使用者名稱已經註冊過!'
          )
        )
      }

      // 成功更新使用者資訊
      const updatedUser = await user.update(formData)
      return res.json({ status: 'success', data: updatedUser.toJSON() })
    } catch (err) {
      next(err)
    }
  },
  postFavorite: async (req, res, next) => {
    try {
      // 獲取商品id
      const productId = req.params.productId

      // 檢驗商品是否存在及是否加入最愛名單中
      const [favoritedProduct, isFavorited] = await Promise.all([
        Product.findByPk(productId),
        Favorite.findOne({ where: { productId } })
      ])

      // 商品不存在
      if (!favoritedProduct) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品')
        )
      }

      // 商品已在最愛名單中
      if (isFavorited) {
        return next(
          new APIError(
            'CONFLICT',
            httpStatusCodes.CONFLICT,
            '已加入最愛名單中!'
          )
        )
      }

      // 將商品加入最愛名單
      const newFavorite = await Favorite.create({
        productId,
        userId: req.user.id
      })

      // 成功將商品加入最愛名單
      return res.json({ status: 'success', data: newFavorite })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
