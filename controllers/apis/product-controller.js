const { Favorite, Product, Category } = require('../../models')
const APIError = require('../../class/errors/APIError')
const httpStatusCodes = require('../../httpStatusCodes')

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
          include: [Category, 'favoritedUsers']
        }),
        Favorite.findAll({ where: { userId } })
      ])

      // 獲取使用者最愛的餐廳id
      // 未登入不會有最愛餐廳的資訊
      const favoritedProductsId = favorites && favorites.map((f) => f.productId)

      // 生成response data 商品資訊包含喜愛的人數及是否為最愛
      const responseData = products.map((product) => {
        const { favoritedUsers, description } = product
        delete product.favoritedUsers

        // 商品描述過長則省略後段文字
        return {
          ...product,
          description:
            description.length > 50
              ? description.slice(50) + '....'
              : description,
          numOfFavorite: Array.isArray(favoritedUsers)
            ? favoritedUsers.length
            : 1,
          isFavorited: favoritedProductsId.includes(product.id)
        }
      })

      // 成功搜尋所有餐廳資訊
      return res.json({ status: 'success', data: responseData })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = productController
