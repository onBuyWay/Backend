const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { localAuthenticate } = require('../../middleware/auth')
const adminRouter = require('./router-modules/admin-router')
const userRouter = require('./router-modules/users-router')

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

// user路由模組:
router.use('/users', userRouter)

// admin路由模組:
router.use('/admin', adminRouter)

// glabal error handler
router.use('/', apiErrorHandler)

module.exports = router
