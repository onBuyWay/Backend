const {
  Order,
  Cart,
  Product,
  OrderItem,
  CartItem,
  Payment,
  User
} = require('../../models')
const {
  generateOrderMailContent,
  generatePaymentMailContent,
  sendMail
} = require('../../utils/mail')
const { getParamsForMpg, decryptTradeInfo } = require('../../utils/payment')
const httpStatusCodes = require('../../httpStatusCodes')
const APIError = require('../../class/errors/APIError')

const orderController = {
  getOrders: async (req, res, next) => {
    try {
      // 獲取使用者id
      const userId = req.user.id

      // 取得使用者所有訂單
      const orders = await Order.findAll({
        where: { userId },
        include: 'orderProducts'
      })

      // 無任何訂單
      if (!orders.length) {
        return res.json({
          stauts: 'success',
          data: [],
          message: '目前還未訂購任何商品喔~'
        })
      }

      // 成功取得訂單資訊
      res.json({ status: 'success', data: orders })
    } catch (err) {
      next(err)
    }
  },
  postOrder: async (req, res, next) => {
    try {
      // 獲取表單
      const formData = { ...req.body }

      // 檢查訂單資訊是否完整
      if (!formData.name || !formData.phone || !formData.address) {
        return next(
          new APIError(
            'BAD REQUEST',
            httpStatusCodes.BAD_REQUEST,
            '請填寫訂單取貨資訊'
          )
        )
      }

      //獲取使用者id
      const userId = req.user.id

      // 獲取購物車資訊
      const userCart = await Cart.findOne({
        where: { userId },
        include: 'cartProducts'
      })

      // 獲取購物車商品資訊
      const { cartProducts } = userCart

      // 檢驗是否有商品數量超過現有庫存
      const insufficientProducts = []

      cartProducts.forEach((product) => {
        if (product.stockQuantity < product.CartItem.quantity) {
          insufficientProducts.push(product.name)
        }
      })

      // 反映何種商品超過庫存
      if (insufficientProducts.length) {
        const errMessage = `以下商品庫存不足: ${insufficientProducts}`
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, errMessage)
        )
      }

      // 獲取表單資訊並建立訂單
      const newOrder = await Order.create({
        userId,
        ...formData
      })

      // 建立array 紀錄所有待處理的promises
      const promises = []
      cartProducts.forEach((cartProduct) => {
        // 生成orderItem 資料
        const orderItemData = {
          productId: cartProduct.id,
          orderId: newOrder.id,
          quantity: cartProduct.CartItem.quantity
        }

        // 建立orderItem並扣除商品庫存
        promises.push(
          OrderItem.create(orderItemData),
          Product.findByPk(cartProduct.id).then((product) =>
            product.update({
              stockQuantity: (product.stockQuantity -=
                cartProduct.CartItem.quantity)
            })
          )
        )
      })

      // 清除購物車
      promises.push(CartItem.destroy({ where: { cartId: userCart.id } }))

      // 等待所有promises執行完畢
      await Promise.all(promises)

      // 寄送訂單訊息與付款連結
      const mailContent = generateOrderMailContent(newOrder, '尚未付款')
      await sendMail(req.user.email, mailContent)

      // 訂單建立成功
      return res.json({ status: 'success', data: newOrder.toJSON() })
    } catch (err) {
      next(err)
    }
  },
  cancelOrder: async (req, res, next) => {
    try {
      // 獲取訂單id
      const { orderId } = req.params

      // 獲取訂單資訊
      const order = await Order.findByPk(orderId)

      // 訂單不存在
      if (
        !order ||
        order.shippingStatus === '已取消' ||
        order.userId !== req.user.id
      ) {
        return next(
          new APIError(
            'NOT FOUND',
            httpStatusCodes.NOT_FOUND,
            '訂單不存在或是已經取消'
          )
        )
      }

      // 更新訂單資訊
      await order.update({ shippingStatus: '已取消', paymentStatus: '已取消' })

      // 成功取消訂單
      return res.json({
        status: 'success',
        message: `編號id:${order.id}的訂單已取消`
      })
    } catch (err) {
      next(err)
    }
  },
  getPayment: async (req, res, next) => {
    try {
      // 獲取訂單id
      const { orderId } = req.params

      // 獲取訂單資訊
      const order = await Order.findByPk(orderId)

      // 訂單不存在
      if (
        !order ||
        order.shippingStatus === '已取消' ||
        order.userId !== req.user.id
      ) {
        return next(
          new APIError(
            'NOT FOUND',
            httpStatusCodes.NOT_FOUND,
            '訂單不存在或是已經取消'
          )
        )
      }

      // 訂單已付款
      if (order.paymentStatus === '已付款') {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '訂單已付款')
        )
      }

      // 產生第三方金流資訊
      const { mpgParams, MerchantOrderNo } = getParamsForMpg(
        order.amount,
        'Product Name',
        req.user.email
      )

      // 更新訂單編號
      await order.update({ sn: MerchantOrderNo })

      // 成功獲取訂單資訊及金流參數
      return res.json({ status: 'success', data: { order, mpgParams } })
    } catch (err) {
      next(err)
    }
  },
  newebpayCallback: async (req, res, next) => {
    try {
      // 解密tradeInfo資訊
      const tradeInfo = decryptTradeInfo(req.body.TradeInfo)

      // 獲取商店訂單編號
      const sn = tradeInfo.Result.MerchantOrderNo

      // 獲取訂單資訊
      let order = await Order.findOne({ where: { sn }, include: User })

      // 訂單不存在
      if (!order) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '該訂單不存在')
        )
      }

      // 新增付款資訊
      await Payment.findOrCreate({
        where: { params: sn },
        defaults: {
          orderId: order.id,
          paymentMethod: tradeInfo.Result.PaymentType,
          paidAt: tradeInfo.Status === 'SUCCESS' ? Date.now() : null,
          params: sn
        }
      })

      if (tradeInfo.Status === 'SUCCESS') {
        // 付款成功，更新訂單付款資訊
        await order.update({ paymentStatus: '已付款' })

        // 生成付款email內容並送出
        const mailContent = generatePaymentMailContent(
          order,
          tradeInfo.Result.PaymentType
        )
        await sendMail(order.User.email, mailContent)

        // 成功新增付款資訊
        return res.json({
          status: 'success',
          message: `訂單id:${order.id}已完成付款`
        })
      } else {
        // 付款失敗
        await order.update({ paymentStatus: '付款失敗' })
        return next(new Error(`訂單id:${order.id}付款失敗, ${data.Message}`))
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = orderController
