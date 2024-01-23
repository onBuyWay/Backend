const express = require('express')
const passport = require('../../config/passport')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')
const {
  localAuthenticate,
  isAuthenticated,
  adminAuthenticated
} = require('../../middleware/auth')
const upload = require('../../middleware/multer')
const adminController = require('../../controllers/apis/admin-controller')

// 使用者相關路由:
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

// 使用者資訊API
router.get(
  '/users/:id',
  /* #swagger.tags = ['User']
     #swagger.description = 'Get單一使用者資訊' */
  /*	#swagger.parameters['id'] = {
            in: 'path',
            description: '使用者id',
            type: 'integer',
            required: true
    } */
  /* #swagger.responses[200] = { 
      schema: {
        $ref: '#/definitions/GetUser_Success'
      },
      description: "成功獲取使用者資訊" } */
  /* #swagger.responses[401] = { 
      schema: {
        $ref: '#/definitions/GetUser_Unauthorized'
      },
      description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
      schema: {
        $ref: '#/definitions/GetUser_NotFound'
      },
      description: "找不到該使用者" } */
  isAuthenticated,
  userController.getUser
)

// 更新使用者資訊API
router.put(
  '/users/:id',
  /* #swagger.tags = ['User']
     #swagger.description = '修改使用者資訊' */
  /*	#swagger.parameters['id'] = {
            in: 'path',
            description: '使用者id',
            type: 'integer',
            required: true
    } */
  /*	#swagger.parameters['obj'] = {
        in: 'body',
        description: '使用者修改資訊',
        required: true,
        schema: {
          $ref: '#/definitions/PutUser_Body'
        }
    } */
  /* #swagger.responses[200] = { 
      schema: {
          $ref: '#/definitions/PutUser_Success'
      },
      description: "成功修改使用者資訊" } */
  /* #swagger.responses[401] = { 
      schema: {
        $ref: '#/definitions/PutUser_Unauthorized'
      },
      description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
      schema: {
        $ref: '#/definitions/PutUser_NotFound'
      },
      description: "找不到該使用者" } */
  isAuthenticated,
  userController.putUser
)

// admin相關APIs:
// 商品APIs
// 獲取所有商品資訊API
router.get(
  '/admin/products',
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
  '/admin/products/:id',
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
  '/admin/products',
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
  '/admin/products/:id',
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
  '/admin/products/:id',
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

// glabal error handler
router.use('/', apiErrorHandler)

module.exports = router
