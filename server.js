const app = require('./app')
const port = process.env.PORT || 3000

// 啟動伺服器
app.listen(port, () => {
  console.log(`The server is listening on localhost:${port}`)
})
