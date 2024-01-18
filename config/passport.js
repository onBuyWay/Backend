const passport = require('passport')
const LocalStrategy = require('passport-local')
const { User } = require('../models')
const bcrypt = require('bcryptjs')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } })
        // 資料庫找不到該帳號
        if (!user) {
          return done(null, false, { message: '帳號或是密碼錯誤' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        // 密碼驗證未通過
        if (!isMatch) return done(null, false, { message: '帳號或是密碼錯誤' })

        // 若通過驗證回傳使用者資訊
        return done(null, user)
      } catch (err) {
        // 資料庫錯誤
        return done(err)
      }
    }
  )
)

// 序列化與反序列化使用者
passport.serializeUser((user, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findByPk(userId)
    if (!user) done(null, false, { message: '找不到該用戶' })
    return done(null, user.toJSON())
  } catch (err) {
    done(err)
  }
})

module.exports = passport
