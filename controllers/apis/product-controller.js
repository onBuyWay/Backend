const { Favorite, Product, Category } = require('../../models')
const APIError = require('../../class/errors/APIError')
const httpStatusCodes = require('../../httpStatusCodes')
const { apiErrorHandler } = require('../../middleware/error-handler')

const productController = {
  getProducts: async (req, res, next) => {
    try {
      // 獲取使用者id
      const userId = req.user ? req.user.id : null

      // 獲取所有商品資訊及使用者最愛資訊
      const [products, favorites] = await Promise.all([
        Product.findAll({
          raw: true,
          nest: true,
          include: [Category]
        }),
        Favorite.findAll({ where: { userId } })
      ])

      // 獲取使用者最愛的餐廳id
      // 未登入不會有最愛餐廳的資訊
      const favoritedProductsId = favorites && favorites.map((f) => f.productId)

      // 生成response data 商品資訊包含喜愛的人數及是否為最愛
      const responseData = products.map((product) => {
        const { description } = product
        const numOfFavorite = favorites.filter(
          (favorite) => favorite.userId === userId
        ).length

        // 商品描述過長則省略後段文字
        return {
          ...product,
          description:
            description.length > 50
              ? description.slice(50) + '....'
              : description,
          numOfFavorite,
          isFavorited: favoritedProductsId.includes(product.id)
        }
      })

      // 成功搜尋所有餐廳資訊
      return res.json({ status: 'success', data: responseData })
    } catch (err) {
      next(err)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      // 獲取商品id
      const productId = Number(req.params.id)
      const userId = req.user ? Number(req.user.id) : null

      // 獲取商品資訊以及使用者最愛名單
      const [product, favoritedProducts] = await Promise.all([
        Product.findByPk(productId, {
          raw: true,
          nest: true,
          include: Category
        }),
        Favorite.findAll({ where: { userId } })
      ])

      // 檢查該id商品是否存在
      if (!product) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品')
        )
      }

      console.log(favoritedProducts)

      // 檢查是否為最愛商品
      const isFavorited = favoritedProducts.some(
        (favorite) =>
          favorite.dataValues.productId === productId &&
          favorite.dataValues.userId === userId
      )

      // 回傳商品資訊
      res.json({ status: 'success', data: { ...product, isFavorited } })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = productController
