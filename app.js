const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const { apis } = require('./routes')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
const cors = require('cors')

// setting cors options
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
  maxAge: 1728000
}

app.use(cors(corsOptions))

// setting bodyParser
app.use(express.urlencoded({ extended: true }))

// 解析有json物件的請求
app.use(express.json())

// 設定session
app.use(
  session({
    secret: 'secret',
    resave: 'false',
    saveUninitialized: 'false'
  })
)

app.use(passport.initialize())
app.use(passport.session())

// 掛載api路由
app.use('/api', apis)

// setting swagger-ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
