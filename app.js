const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const { apis } = require('./routes')
const port = process.env.port || 3000
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')

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

// 啟動伺服器
app.listen(port, () => {
  console.log(`The server is listening on localhost:${port}`)
})
