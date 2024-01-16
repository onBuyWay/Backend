const express = require('express')
const { apis } = require('./routes')
const port = process.env.port || 3000

const app = express()

// setting bodyParser
app.use(express.urlencoded({ extended: true }))

// 解析有json物件的請求
app.use(express.json())

// 掛載api路由
app.use('/api', apis)

// 啟動伺服器
app.listen(port, () => {
  console.log(`The server is listening on localhost:${port}`)
})
