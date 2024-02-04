const { Product, Category, Order } = require('../../models')
const APIError = require('../../class/errors/APIError')
const httpStatusCodes = require('../../httpStatusCodes')
const { imgurFileHandler } = require('../../helpers/file-helpers')

const adminController = {
  // =====商品相關controller=====
  getProducts: async (req, res, next) => {
    try {
      // 從資料庫獲得所有商品資訊
      const products = await Product.findAll({ include: Category })
      // 搜尋成功
      return res.json({ status: 'success', data: products })
    } catch (err) {
      next(err)
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: Category
      })
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
    // 取得表單資訊
    const formData = { ...req.body }

    // 未填寫商品欄位
    if (
      !formData.name ||
      !formData.description ||
      !formData.stockQuantity ||
      !formData.costPrice ||
      !formData.sellPrice ||
      !formData.productStatus ||
      !formData.categoryId
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
      // 檢查商品是否已存在
      const sameNameProduct = await Product.findOne({
        where: { name: formData.name }
      })
      if (sameNameProduct) {
        return next(
          new APIError(
            'CONFLICT',
            httpStatusCodes.CONFLICT,
            '商品名稱已經註冊過!'
          )
        )
      }

      // 正確填寫資訊後，圖片上傳至imgur，保留圖片URL
      const { file } = req
      const filePath = await imgurFileHandler(file)
      // 新增商品資訊
      const newProduct = await Product.create({
        ...formData,
        image: filePath || null
      })
      // 成功新增商品資訊
      res.json({ status: 'success', data: newProduct })
    } catch (err) {
      next(err)
    }
  },
  putProduct: async (req, res, next) => {
    // 獲取表單資料
    const formData = { ...req.body }

    // 未填寫商品欄位
    if (
      !formData.name ||
      !formData.description ||
      !formData.stockQuantity ||
      !formData.costPrice ||
      !formData.sellPrice ||
      !formData.productStatus ||
      !formData.categoryId
    ) {
      return next(
        new APIError(
          'BAD REQUEST',
          httpStatusCodes.BAD_REQUEST,
          '商品資訊欄位不能為空!'
        )
      )
    }

    try {
      // 檢查該id商品資料是否存在及商品名稱是否重複
      const [selectedProduct, sameNameProduct] = await Promise.all([
        Product.findByPk(req.params.id),
        Product.findOne({ where: { name: req.body.name } })
      ])

      // 沒有該商品資訊
      if (!selectedProduct) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該商品!')
        )
      }

      // 類別名稱重複
      if (sameNameProduct && selectedProduct.id !== sameNameProduct.id) {
        return next(
          new APIError(
            'CONFLICT',
            httpStatusCodes.CONFLICT,
            '商品名稱已經註冊過!'
          )
        )
      }

      // 正確填寫資訊後，圖片上傳至imgur，保留圖片URL
      const { file } = req
      const filePath = await imgurFileHandler(file)

      // 將商品資訊更新至資料庫
      const updatedProduct = await selectedProduct.update({
        ...formData,
        image: filePath || selectedProduct.img
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
  getCategories: async (req, res, next) => {
    try {
      // 從資料庫獲得所有類別資訊
      const categories = await Category.findAll()
      // 搜尋成功
      res.json({ status: 'success', data: categories })
    } catch (err) {
      next(err)
    }
  },
  getCategory: async (req, res, next) => {
    try {
      // 搜尋該id類別
      const category = await Category.findByPk(req.params.id)

      // 檢查該id類別是否存在
      if (!category) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該類別')
        )
      }

      // 搜尋成功
      res.json({ status: 'success', data: category })
    } catch (err) {
      next(err)
    }
  },
  postCategory: async (req, res, next) => {
    // 取得表單資訊
    const formData = { ...req.body }

    // 未填寫類別名稱
    if (!formData.name) {
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
      const sameNameCategory = await Category.findOne({
        where: { name: formData.name }
      })
      if (sameNameCategory) {
        return next(
          new APIError(
            'CONFLICT',
            httpStatusCodes.CONFLICT,
            '類別名稱已經註冊過!'
          )
        )
      }

      // 類別尚未建立則新增至資料庫
      const newCategory = await Category.create(formData)

      // 類別建立成功
      return res.json({ status: 'success', data: newCategory })
    } catch (err) {
      return next(err)
    }
  },
  putCategory: async (req, res, next) => {
    // 獲取表單資料
    const formData = { ...req.body }

    // 未填寫類別名稱
    if (!formData.name) {
      return next(
        new APIError(
          'BAD REQUEST',
          httpStatusCodes.BAD_REQUEST,
          '類別名稱欄位不能為空!'
        )
      )
    }

    try {
      // 檢查該id類別是否存在及類別名稱是否重複
      const [selectedCategory, sameNameCategory] = await Promise.all([
        Category.findByPk(req.params.id),
        Category.findOne({ where: { name: formData.name } })
      ])

      // 沒有該商品資訊
      if (!selectedCategory) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該類別!')
        )
      }

      // 類別名稱重複
      if (sameNameCategory && selectedCategory.id !== sameNameCategory.id) {
        return next(
          new APIError(
            'CONFLICT',
            httpStatusCodes.CONFLICT,
            '類別名稱已經註冊過!'
          )
        )
      }

      // 類別尚未建立則新增至資料庫
      const updatedCategory = await selectedCategory.update(formData)

      // 類別建立成功
      return res.json({ status: 'success', data: updatedCategory })
    } catch (err) {
      return next(err)
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      // 從資料庫搜尋欲刪除類別
      const category = await Category.findByPk(req.params.id)

      // 找不到該商品
      if (!category) {
        return next(
          new APIError('NOT FOUND', httpStatusCodes.NOT_FOUND, '找不到該類別!')
        )
      }

      // 刪除類別
      await category.destroy()

      // 成功刪除類別
      return res.json({ status: 'success', data: {} })
    } catch (err) {
      next(err)
    }
  },
  getOrders: async (req, res, next) => {
    try {
      // 從資料庫獲得所有訂單資訊
      const orders = await Order.findAll({
        raw: true,
        nest: true
      })

      // 搜尋成功
      return res.json({ status: 'success', data: orders })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
