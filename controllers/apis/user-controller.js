const bcrypt = require('bcryptjs')
const { User } = require('../../models')
const APIError = require('../../class/errors/APIError')
const httpStatusCodes = require('../../httpStatusCodes')

const userController = {
  signUp: (req, res, next) => {
    // 密碼驗證錯誤
    if (req.body.password !== req.body.passwordCheck) {
      return next(
        new APIError(
          'BAD REQUEST',
          httpStatusCodes.BAD_REQUEST,
          'Passwords do not match!'
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
              'email already exists!'
            )
          )
        }
        return bcrypt.hash(req.body.password, 10)
      })
      .then((hash) => {
        // 成功建立user
        const userData = { ...req.body, password: hash }
        return User.create(userData).then((newUser) => {
          res.json({ user: newUser })
        })
      })
      .catch((err) => next(err))
  }
}

module.exports = userController
