const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const { apis } = require('./routes')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
const cors = require('cors')
const { none } = require('./middleware/multer')

// setting origin
const origins = ['https://onbuyway-tw.web.app', 'http://ec2-54-206-88-241.ap-southeast-2.compute.amazonaws.com']

// setting cors options
const corsOptions = {
  origin: origins,
  credentials: true,
  maxAge: 1728000
}

const cookieConfig = {
  sameSite: none,
  secure: process.env.NODE_ENV === 'production'
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
    saveUninitialized: 'false',
    cookie: process.env.NODE_ENV === 'production' ? cookieConfig : {}
  })
)

app.use(passport.initialize())
app.use(passport.session())

// 掛載api路由
app.use('/api', apis)

// setting swagger-ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
