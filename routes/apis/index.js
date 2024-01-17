const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')

// 註冊api
router.post(
  '/signUp',
  /* #swagger.tags = ['User']
     #swagger.description = '使用者登入' */
  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '使用者註冊資訊',
            required: true,
            schema: {
            "name": "user_example",
            "password": "password_example",
            "passwordCheck": "password_example",
            "email": "email_example",
            "birthday": "1990-01-01",
            "phone": "xxxxxxxxxx",
            "gender": "boy"
            }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "status": "success",
        "data": {
            "id": 3,
            "name": "user_example",
            "password": "$2a$10$IMzB0FRUV.KVw1D458iLNOycwLmPiGfsrPnqxSkBCJrgra2W9cRoG",
            "email": "email_example",
            "birthday": "1990-01-01",
            "phone": "xxxxxxxxxx",
            "gender": "boy",
            "updatedAt": "2024-01-17T08:18:28.238Z",
            "createdAt": "2024-01-17T08:18:28.238Z"
        }
    },
      description: "使用者註冊成功" } */
  /* #swagger.responses[400_FiledNotEmpty] = { 
      schema: {
        "status": "error",
        "error": {
            "name": "BAD REQUEST",
            "message": "帳號、密碼、姓名欄位不能為空!!",
            "stack": "BAD REQUEST: 帳號、密碼、姓名欄位不能為空!!\n    at new customError (D:\\Project\\onBuyWay\\Backend\\class\\errors\\customError.js:8:11)\n    at new APIError (D:\\Project\\onBuyWay\\Backend\\class\\errors\\APIError.js:6:5)\n    at signUp (D:\\Project\\onBuyWay\\Backend\\controllers\\apis\\user-controller.js:10:9)\n    at Layer.handle [as handle_request] (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at Route.dispatch (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\route.js:114:3)\n    at Layer.handle [as handle_request] (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\index.js:284:15\n    at Function.process_params (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\index.js:346:12)\n    at next (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\index.js:280:10)"
        }
    },
      description: "帳號、密碼、姓名欄位未填寫" } */
  /* #swagger.responses[400_PasswordValidationFailed] = { 
      schema: {
        "status": "error",
        "error": {
            "name": "BAD REQUEST",
            "message": "密碼驗證未通過!",
            "stack": "BAD REQUEST: 密碼驗證未通過!\n    at new customError (D:\\Project\\onBuyWay\\Backend\\class\\errors\\customError.js:8:11)\n    at new APIError (D:\\Project\\onBuyWay\\Backend\\class\\errors\\APIError.js:6:5)\n    at signUp (D:\\Project\\onBuyWay\\Backend\\controllers\\apis\\user-controller.js:20:9)\n    at Layer.handle [as handle_request] (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at Route.dispatch (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\route.js:114:3)\n    at Layer.handle [as handle_request] (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\index.js:284:15\n    at Function.process_params (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\index.js:346:12)\n    at next (D:\\Project\\onBuyWay\\Backend\\node_modules\\express\\lib\\router\\index.js:280:10)"
        }
    },
      description: "密碼驗證未通過" } */
  /* #swagger.responses[409] = { 
      schema: {
        "status": "error",
        "error": {
            "name": "CONFLICT",
            "message": "eamil已經註冊過!",
            "stack": "CONFLICT: eamil已經註冊過!\n    at new customError (D:\\Project\\onBuyWay\\Backend\\class\\errors\\customError.js:8:11)\n    at new APIError (D:\\Project\\onBuyWay\\Backend\\class\\errors\\APIError.js:6:5)\n    at D:\\Project\\onBuyWay\\Backend\\controllers\\apis\\user-controller.js:32:13\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
        }
    },
      description: "eamil已經註冊過!" } */
  userController.signUp
)

// glabal error handler
router.use('/', apiErrorHandler)

module.exports = router
