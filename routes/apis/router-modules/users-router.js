const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/apis/user-controller')
const { isAuthenticated } = require('../../../middleware/auth')

// =====使用者APIs=====
// 獲取使用者資訊API
router.get(
  '/:id',
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
  '/:id',
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

module.exports = router
