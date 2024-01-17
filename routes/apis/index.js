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
            "birthday": "1990/01/01",
            "phone": "xxxxxxxxxx",
            "gender": "boy"
            }
    } */
  /* #swagger.responses[200] = { 
      schema: {
        "user": {
            "id": 5,
            "name": "user_example",
            "password": "$2a$10$e9YWLQ0ndHRMvzCMO7kjXOt9t67j.MWxU4Jk3RIenakQFAAVvNBDS",
            "email": "email_example",
            "birthday": "1989-12-31T16:00:00.000Z",
            "phone": "xxxxxxxxxx",
            "gender": "boy",
            "updatedAt": "2024-01-17T07:09:13.324Z",
            "createdAt": "2024-01-17T07:09:13.324Z"
        }
    },
      description: "使用者註冊成功" } */
  userController.signUp
)

// glabal error handler
router.use('/', apiErrorHandler)

module.exports = router
