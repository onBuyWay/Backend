const crypto = require('node:crypto')
require('dotenv').config()
const URL = process.env.URL
// 藍新金流商店資訊
const hashKey = process.env.HASH_KEY
const hashIV = process.env.HASH_IV
const MerchantID = process.env.MERCHANT_ID

// 交易成功返回商店URL
const ReturnURL = URL + ''
// 交易成功通知商店server URL
const NotifyURL = URL + ''
// 返回URL
const ClientBackURL = URL + ''

// 生成URL字串
function generateQuery(tradeInfo) {
  const paramsArray = []
  for (let [key, value] of Object.entries(tradeInfo)) {
    paramsArray.push(`${key}=${value}`)
  }
  return paramsArray.join('&')
}

// 以AES加密URL字串
function createEncryptByAES(tradeInfo) {
  const cipher = crypto.createCipheriv('aes-256-cbc', hashKey, hashIV)
  let encrypted = cipher.update(generateQuery(tradeInfo), 'utf8', 'hex')
  return (encrypted += cipher.final('hex'))
}

// 以SHA256加密 aes密碼
function createEncryptBySHA256(aesEncrypt) {
  const sha = crypto.createHash('sha256')
  const plainText = `HashKey=${hashKey}&${aesEncrypt}&HashIV=${hashIV}`
  return sha.update(plainText).digest('hex').toUpperCase()
}

module.exports = {
  // 生成MPG所需參數
  getParamsForMpg: (Amt, ItemDesc, Email) => {
    const TimeStamp = Math.floor(Date.now() / 1000)
    const data = {
      MerchantID,
      RespondType: 'JSON',
      TimeStamp,
      Version: '2.0',
      MerchantOrderNo: TimeStamp,
      Amt,
      ItemDesc,
      ReturnURL,
      NotifyURL,
      ClientBackURL,
      Email,
      LoginType: 0
    }

    const aesEncrypt = createEncryptByAES(generateQuery(data))
    const shaEncrypt = createEncryptBySHA256(aesEncrypt)

    const mpgParams = {
      MerchantID,
      TradeInfo: aesEncrypt,
      TradeSha: shaEncrypt,
      Version: '2.0'
    }

    return { mpgParams, MerchantOrderNo: data.MerchantOrderNo }
  }
}
