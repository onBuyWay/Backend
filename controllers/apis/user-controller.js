const bcrypt = require('bcryptjs')
const { User } = require('../../models')
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
    // 更新姓名、電話、性別、地址、生日
    try {
      const user = await User.findByPk(req.params.id)
      // 找不到該使用者
      if (!user) {
        return next(
          new APIError(
            'NOT FOUND',
            httpStatusCodes.NOT_FOUND,
            '找不到該使用者!'
          )
        )
      }
      // 欄位不能為空
      if (!req.body.name) {
        return next(
          new APIError(
            'BAD REQUEST',
            httpStatusCodes.BAD_REQUEST,
            '姓名欄位不能為空!'
          )
        )
      }
      // 成功更新使用者資訊
      const updatedUser = await user.update(req.body)
      return res.json({ status: 'success', data: updatedUser.toJSON() })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
