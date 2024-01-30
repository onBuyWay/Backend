const nodemailer = require('nodemailer')
const { orderCofirmEmail } = require('../helpers/generateMailHTML')
require('dotenv').config()

const sendMailPromise = (mailOptions) => {
  return new Promise(async (resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    })

    const info = await transporter.sendMail(mailOptions)
    if (info instanceof Error) {
      reject(new Error('寄送email錯誤'))
    } else {
      resolve(true)
    }
  })
}

module.exports = {
  sendMail: async (receiverMail, mailContent) => {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: receiverMail,
      subject: mailContent.subject,
      html: mailContent.html
    }
    return await sendMailPromise(mailOptions)
  },
  generateOrderMailContent: (order, paymentStatus) => {
    return {
      subject: `onBuyWay 成功下訂! 訂單編號:${order.id}`,
      html: orderCofirmEmail({ order, paymentStatus, url: process.env.URL })
    }
  }
}
