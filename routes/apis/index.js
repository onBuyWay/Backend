const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const productController = require('../../controllers/apis/product-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { localAuthenticate, isAuthenticated } = require('../../middleware/auth')
const adminRouter = require('./router-modules/admin-router')
const userRouter = require('./router-modules/users-router')

// 使用者相關APIs:
// 註冊API
router.post(
  '/signUp',
  /* #swagger.tags = ['User']
     #swagger.description = '使用者註冊' */
  /*	#swagger.parameters['body'] = {
            in: 'body',
            description: '使用者註冊資訊',
            required: true,
            schema: {$ref: '#/definitions/SignUpUser_Body'}
    } */
  /* #swagger.responses[200] = { 
      schema: {
        $ref: '#/definitions/SignUpUser_Success'
    },
      description: "使用者註冊成功" } */
  /* #swagger.responses[400_FiledNotEmpty] = { 
      schema: {
        $ref: '#/definitions/SignUpUser_Error_FiledNotEmpty'
    },
      description: "帳號、密碼、姓名欄位未填寫" } */
  /* #swagger.responses[400_PasswordValidationFailed] = { 
      schema: {
        $ref: '#/definitions/SignUpUser_Error_PasswordValidationFailed'
    },
      description: "密碼驗證未通過" } */
  /* #swagger.responses[409] = { 
      schema: {
        $ref: '#/definitions/SignUpUser_Error_CONFLICT'
    },
      description: "eamil已經註冊過!" } */
  userController.signUp
)

// 登入API
router.post(
  '/signIn',
  /* #swagger.tags = ['User']
     #swagger.description = '使用者登入' */
  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '使用者登入資訊',
            required: true,
            schema: {
              $ref: '#/definitions/SignInUser_Body'
            }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        $ref: '#/definitions/SignInUser_Sucess'
    },
      description: "使用者登入成功" } */
  /* #swagger.responses[401] = { 
      schema: {
        $ref: '#/definitions/SignInUser_Unauthorized'
    },
      description: "帳號或是密碼錯誤" } */

  localAuthenticate,
  userController.signIn
)

// 商品加入最愛API
router.post(
  '/favorites/:productId',
  /* #swagger.tags = ['User']
       #swagger.description = '商品加入最愛' */
  /*	#swagger.parameters['productId'] = {
              in: 'path',
              description: '商品id',
              type: 'integer',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
           $ref: '#definitions/PostFavorite_Success'
        },
        description: "商品成功加入最愛" } */
  /* #swagger.responses[401] = { 
        schema: {
           $ref: '#definitions/PostFavorite_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
            $ref: '#definitions/PostFavorite_NotFound'
        },
        description: "找不到該商品" } */
  /* #swagger.responses[409] = { 
        schema: {
          $ref: '#definitions/PostFavorite_Conflict'
        },
        description: "商品已加入最愛!" } */
  isAuthenticated,
  userController.postFavorite
)

// 商品從最愛中移除
router.delete(
  '/favorites/:productId',
  /* #swagger.tags = ['User']
       #swagger.description = '商品從最愛移除' */
  /*	#swagger.parameters['productId'] = {
              in: 'path',
              description: '商品id',
              type: 'integer',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
           $ref: '#definitions/DeleteFavorite_Success'
        },
        description: "商品成功加入最愛" } */
  /* #swagger.responses[401] = { 
        schema: {
           $ref: '#definitions/DeleteFavorite_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
            $ref: '#definitions/DeleteFavorite_NotFound'
        },
        description: "最愛名單中找不到該商品" } */
  isAuthenticated,
  userController.deleteFavorite
)

// 獲取所有餐廳資訊
router.get(
  '/products',
  /* #swagger.tags = ['Product']
       #swagger.description = 'Get所有商品資訊' */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#/definitions/GetProducts_Success'
      },
        description: "成功獲取商品資訊" } */
  productController.getProducts
)

// user路由模組:
router.use('/users', userRouter)

// admin路由模組:
router.use('/admin', adminRouter)

// glabal error handler
router.use('/', apiErrorHandler)

module.exports = router
