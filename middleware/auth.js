const APIError = require('../class/errors/APIError')
const passport = require('../config/passport')
const { ensureAuthenticated } = require('../helpers/auth-helpers')
const httpStatusCodes = require('../httpStatusCodes')

module.exports = {
  localAuthenticate: (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      // 資料庫錯誤
      if (err) return next(err)

      // 驗證錯誤
      if (!user) {
        return next(
          new APIError(
            'Unauthorized',
            httpStatusCodes.Unauthorized,
            info.message
          )
        )
      }
      // 驗證成功手動登入
      req.logIn(user, (err) => {
        if (err) return next(err)
        next()
      })
    })(req, res, next)
  },
  isAuthenticated: (req, res, next) => {
    if (!ensureAuthenticated(req))
      return next(
        new APIError(
          'Unauthorized',
          httpStatusCodes.Unauthorized,
          '使用者未登入!'
        )
      )
    return next()
  }
}
