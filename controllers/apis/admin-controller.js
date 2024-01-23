const { Product, Category } = require('../../models')
const APIError = require('../../class/errors/APIError')
const httpStatusCodes = require('../../httpStatusCodes')
const { imgurFileHandler } = require('../../helpers/file-helpers')

const adminController = {
  // =====商品相關controller=====
  getProducts: async (req, res, next) => {
    try {
      // 從資料庫獲得所有商品資訊
      const products = await Product.findAll({ raw: true })
      // 搜尋成功
      return res.json({ status: 'success', data: products })
    } catch (err) {
      next(err)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id)
      if (!product) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品')
        )
      }
      return res.json({ status: 'success', data: product.toJSON() })
    } catch (err) {
      next(err)
    }
  },
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
  },
  deleteProduct: async (req, res, next) => {
    try {
      // 從資料庫搜尋欲刪除商品
      const product = await Product.findByPk(req.params.id)

      // 找不到該商品
      if (!product) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品!')
        )
      }

      // 刪除商品
      await product.destroy()

      // 成功刪除商品
      return res.json({ status: 'success', data: {} })
    } catch (err) {
      next(err)
    }
  },
  // =====商品類別相關controller=====
  postCategory: async (req, res, next) => {
    // 未填寫類別名稱
    if (!req.body.name) {
      return next(
        new APIError(
          'BAD REQUEST',
          httpStatusCodes.BAD_REQUEST,
          '類別名稱欄位不能為空!'
        )
      )
    }

    try {
      // 檢查類別是否存在
      const sameCategory = await Category.findOne({
        where: { name: req.body.name }
      })
      if (sameCategory) {
        return next(
          new APIError(
            'CONFLICT',
            httpStatusCodes.CONFLICT,
            '類別名稱已經註冊過!'
          )
        )
      }

      // 類別尚未建立則新增至資料庫
      const formData = { ...req.body }
      const newCategory = await Category.create(formData)

      // 類別建立成功
      return res.json({ status: 'success', data: newCategory })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = adminController
