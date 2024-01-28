const { Product, Cart, CartItem } = require('../../models')
const APIError = require('../../class/errors/APIError')
const httpStatusCodes = require('../../httpStatusCodes')

const cartController = {
  // 購物車相關controller
  getCart: async (req, res, next) => {
    try {
      // 獲取使用者id
      const userId = req.user.id

      // 獲取使用者購物車及購物商品
      const userCart = await Cart.findOne({
        where: { userId },
        include: 'cartProducts'
      })

      // 檢驗購物車是否為空
      const cartProducts = userCart.cartProducts
      if (!cartProducts.length) {
        return res.json({ stauts: 'success', message: '目前購物車中沒有商品~' })
      }

      // 計算購物車所有商品總價總價
      const totalPrice = cartProducts
        .map((product) => product.sellPrice * product.CartItem.quantity)
        .reduce((accumulator, priceSum) => accumulator + priceSum)

      // 成功獲取購物車商品資訊
      return res.json({ stauts: 'success', data: { cartProducts, totalPrice } })
    } catch (err) {
      next(err)
    }
  },
  postCart: async (req, res, next) => {
    try {
      // 獲取商品id
      const productId = req.params.productId
      const userId = req.user.id

      // 獲取欲加入的商品資訊
      const addProduct = await Product.findByPk(productId)

      // 若商品庫存不足
      if (addProduct.stockQuantity === 0) {
        return next(
          new APIError('Not Found', httpStatusCodes.NOT_FOUND, '商品庫存不足')
        )
      }

      //若session沒有保存userCartId
      if (!req.session.userCartId) {
        // 獲取使用者購物車，若資料庫沒有，為使用者建立購物車
        const [userCart] = await Cart.findOrCreate({ where: { userId } })

        // 保存至session方便後續取用
        req.session.userCartId = userCart.id
        await req.session.save()
      }

      // 獲取使用者購物車商品，若無則在資料庫新增
      const [cartItem, created] = await CartItem.findOrCreate({
        where: { cartId: req.session.userCartId, productId },
        defaults: { quantity: 1 }
      })

      // 若已經存在於購物車
      if (!created) {
        // 增加數量後如果超過庫存，生成 APIError
        if (cartItem.quantity + 1 > addProduct.stockQuantity) {
          return next(
            new APIError('Not Found', httpStatusCodes.NOT_FOUND, '商品庫存不足')
          )
        }
      }

      // 更新購物商品數量+1
      await cartItem.increment('quantity')

      // 成功將商品新增至購物車
      return res.json({ status: 'success', data: { cartItem, addProduct } })
    } catch (err) {
      next(err)
    }
  },
  // 購物車商品相關controller
  addCartItem: async (req, res, next) => {
    try {
      // 獲取購物車中物件id
      const cartItemId = req.params.cartItemId

      // 獲取該物件資訊
      const cartItem = await CartItem.findByPk(cartItemId)

      // 找不到該物件
      if (!cartItem) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品')
        )
      }

      // 獲取商品資訊
      const productId = cartItem.productId
      const addProduct = await Product.findByPk(productId)

      // 增加數量後如果超過庫存，生成 APIError
      if (cartItem.quantity + 1 > addProduct.stockQuantity) {
        return next(
          new APIError('Not Found', httpStatusCodes.NOT_FOUND, '商品庫存不足')
        )
      }

      // 更新購物商品數量+1
      await cartItem.increment('quantity')

      // 成功增加購物車商品數量
      return res.json({ status: 'success', data: { cartItem } })
    } catch (err) {
      next(err)
    }
  },
  subCartItem: async (req, res, next) => {
    try {
      // 獲取購物車中物件id
      const cartItemId = req.params.cartItemId

      // 獲取該物件資訊
      const cartItem = await CartItem.findByPk(cartItemId)

      // 找不到該物件
      if (!cartItem) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品')
        )
      }

      // 扣除數量，數量下限為1
      cartItem.update({
        quantity: cartItem.quantity - 1 > 0 ? cartItem.quantity - 1 : 1
      })

      // 成功增加購物車商品數量
      return res.json({ status: 'success', data: { cartItem } })
    } catch (err) {
      next(err)
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      // 獲取購物車中物件id
      const cartItemId = req.params.cartItemId

      // 獲取該物件資訊
      const cartItem = await CartItem.findByPk(cartItemId)

      console.log(CartItem)

      // 找不到該物件
      if (!cartItem) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品')
        )
      }

      // 刪除該物件
      await cartItem.destroy()

      // 成功刪除物件
      return res.json({ status: 'success', data: {} })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = cartController
