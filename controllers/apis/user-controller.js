const bcrypt = require('bcryptjs')
const { User } = require('../../models')
const { customError } = require('../../helpers/customError')

const userController = {
  signUp: (req, res, next) => {
    // 密碼驗證錯誤
    if (req.body.password !== req.body.passwordCheck) {
      return next(customError('password do not match!', 400))
    }
    return User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        // 帳戶已存在
        if (user) {
          return next(customError('email already exists!', 409))
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
