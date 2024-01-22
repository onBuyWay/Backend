const { Product } = require('../../models')
const APIError = require('../../class/errors/APIError')
const httpStatusCodes = require('../../httpStatusCodes')
const { imgurFileHandler } = require('../../helpers/file-helpers')

const adminController = {
  postProduct: async (req, res, next) => {
    const {
      name,
      description,
      stockQuantity,
      costPrice,
      sellPrice,
      productStatus,
      categoryId
    } = req.body

    // 未填寫商品欄位
    if (
      !name ||
      !description ||
      !stockQuantity ||
      !costPrice ||
      !sellPrice ||
      !productStatus ||
      !categoryId
    ) {
      next(
        new APIError(
          'BAD REQUEST',
          httpStatusCodes.BAD_REQUEST,
          '商品資訊欄位不能為空!'
        )
      )
    }

    const { file } = req
    try {
      // 圖片上傳至imgur
      const filePath = await imgurFileHandler(file)
      // 新增商品資訊
      const newProduct = await Product.create({
        name,
        image: filePath || null,
        description,
        stockQuantity,
        costPrice,
        sellPrice,
        productStatus,
        categoryId
      })
      res.json({ status: 'success', data: newProduct })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
