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
        // 成功建立user
        const userData = { ...req.body, password: hash }
        return User.create(userData).then((newUser) => {
          res.json({ status: 'success', data: newUser })
        })
      })
      .catch((err) => next(err))
  },
  signIn: (req, res, next) => {
    return res.json({ status: 'success', data: req.user })
  }
}

module.exports = userController
