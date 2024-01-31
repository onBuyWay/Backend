const { Order, Cart, Product, OrderItem, CartItem } = require('../../models')
const { generateOrderMailContent, sendMail } = require('../../utils/mail')
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
  }
}

module.exports = orderController
