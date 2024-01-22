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

    try {
      // 圖片上傳至imgur
      const { file } = req
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
      // 將商品資訊新增成功
      res.json({ status: 'success', data: newProduct })
    } catch (err) {
      next(err)
    }
  },
  putProduct: async (req, res, next) => {
    try {
      // 搜尋該商品資料
      const selectedProduct = await Product.findByPk(req.params.id)
      // 沒有該商品資訊
      if (!selectedProduct) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品!')
        )
      }

      // 更新商品資訊
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
        return next(
          new APIError(
            'BAD REQUEST',
            httpStatusCodes.BAD_REQUEST,
            '商品資訊欄位不能為空!'
          )
        )
      }

      // 正確填寫資訊後，圖片上傳至imgur
      const { file } = req
      const filePath = await imgurFileHandler(file)

      // 將商品資訊更新至資料庫
      const updatedProduct = await selectedProduct.update({
        name,
        image: filePath || selectedProduct.img,
        description,
        stockQuantity,
        costPrice,
        sellPrice,
        productStatus,
        categoryId
      })
      // 資料庫更新成功
      res.json({ status: 'success', data: updatedProduct.toJSON() })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
