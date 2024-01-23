const express = require('express')
const upload = require('../../../middleware/multer')
const adminController = require('../../../controllers/apis/admin-controller')
const router = express.Router()
const { adminAuthenticated } = require('../../../middleware/auth')

// =====管理商品APIs=====
// 獲取所有商品資訊API
router.get(
  '/products',
  /* #swagger.tags = ['Product']
       #swagger.description = 'Get所有商品資訊' */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#/definitions/AdminGetProducts_Success'
      },
        description: "成功獲取商品資訊" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#/definitions/AdminGetProducts_Unauthorized'
        },
        description: "使用者未登入" } */
  adminAuthenticated,
  adminController.getProducts
)

// 獲取單一商品資訊API
router.get(
  '/products/:id',
  /* #swagger.tags = ['Product']
       #swagger.description = 'Get單一商品資訊' */
  /*	#swagger.parameters['id'] = {
              in: 'path',
              description: '商品id',
              type: 'integer',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
           $ref: '#/definitions/AdminGetProduct_Success'
      },
        description: "成功獲取商品資訊" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#/definitions/AdminGetProduct_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
            $ref: '#/definitions/AdminGetProduct_NotFound'
        },
        description: "找不到該商品" } */
  adminAuthenticated,
  adminController.getProduct
)

// 新增商品API
router.post(
  '/products',
  /* #swagger.tags = ['Product']
       #swagger.description = '商品註冊' */
  /*	#swagger.parameters['body'] = {
              in: 'body',
              description: '商品註冊資訊',
              required: true,
              schema: {
                $ref: '#definitions/AdminPostProduct_Body'
              }
      } */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#definitions/AdminPostProduct_Success'
        },
        description: "商品註冊成功" } */
  /* #swagger.responses[400] = { 
        schema: {
          $ref: '#definitions/AdminPostProduct_BadRequest'
       },
        description: "商品欄位未填寫" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#definitions/AdminPostProduct_Unauthorized'
        },
        description: "使用者未登入" } */
  adminAuthenticated,
  upload.single('image'),
  adminController.postProduct
)

// 更新商品API
router.put(
  '/products/:id',
  /* #swagger.tags = ['Product']
       #swagger.description = '商品資訊更新' */
  /*	#swagger.parameters['id'] = {
              in: 'path',
              description: '商品id',
              type: 'integer',
              required: true
      } */
  /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: '商品更新資訊',
              required: true,
              schema: {
                $ref: '#definitions/AdminPutProduct_Body'
              }
      } */
  /* #swagger.responses[200] = { 
        schema: {
           $ref: '#definitions/AdminPutProduct_Success'
        },
        description: "商品資訊更新成功" } */
  /* #swagger.responses[400] = { 
        schema: {
           $ref: '#definitions/AdminPutProduct_BadRequest'
       },
        description: "商品欄位未填寫" } */
  /* #swagger.responses[401] = { 
        schema: {
           $ref: '#definitions/AdminPutProduct_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
            $ref: '#definitions/AdminPutProduct_NotFound'
        },
        description: "找不到該商品" } */
  adminAuthenticated,
  upload.single('image'),
  adminController.putProduct
)

router.delete(
  '/products/:id',
  /* #swagger.tags = ['Product']
       #swagger.description = '商品資訊更新' */
  /*	#swagger.parameters['id'] = {
              in: 'path',
              description: '商品id',
              type: 'integer',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
           $ref: '#definitions/AdminDeleteProduct_Success'
        },
        description: "商品資訊更新成功" } */
  /* #swagger.responses[401] = { 
        schema: {
           $ref: '#definitions/AdminDeleteProduct_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
            $ref: '#definitions/AdminDeleteProduct_NotFound'
        },
        description: "找不到該商品" } */
  adminAuthenticated,
  adminController.deleteProduct
)

// =====管理類別APIs=====
// 新增商品類別API
router.post(
  '/categories',
  /* #swagger.tags = ['Category']
       #swagger.description = '新增商品類別' */
  /*	#swagger.parameters['body'] = {
              in: 'body',
              description: '商品註冊資訊',
              required: true,
              schema: {
                $ref: '#definitions/AdminPostCategory_Body'
              }
      } */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#definitions/AdminPostCategory_Success'
        },
        description: "商品註冊成功" } */
  /* #swagger.responses[400] = { 
        schema: {
          $ref: '#definitions/AdminPostCategory_BadRequest'
       },
        description: "商品欄位未填寫" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#definitions/AdminPostCategory_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[409] = { 
        schema: {
          $ref: '#definitions/AdminPostCategory_Conflict'
        },
        description: "類別名稱已經註冊過!" } */
  adminAuthenticated,
  adminController.postCategory
)

module.exports = router
