const { ImgurClient } = require('imgur')
const fs = require('fs')
// 設定環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
  refreshToken: process.env.IMGUR_REFRESH_TOKEN
})

const imgurFileHandler = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 沒有上傳圖片無須動作
      if (!file) resolve(null)
      // 上傳圖片至imgur
      const img = await client.upload({
        // 從文件路徑中讀取圖片
        image: fs.createReadStream(file.path),
        album: process.env.IMGUR_ALBUM_ID,
        type: 'stream'
      })
      // 回傳imgur圖片url
      resolve(img?.data.link || null)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { imgurFileHandler }
