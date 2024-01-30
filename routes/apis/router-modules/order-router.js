const express = require('express')
const router = express.Router()
const orderController = require('../../../controllers/apis/order-controller')

router.post(
  '/',
  /* #swagger.tags = ['Order']
       #swagger.description = '新增訂單' */
  /*	#swagger.parameters['body'] = {
              in: 'body',
              description: '新增訂單資訊',
              required: true,
              schema: {
                $ref: '#definitions/PostOrder_Body'
              }
      } */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#definitions/PostOrder_Success'
        },
        description: "訂單新增成功" } */
  /* #swagger.responses[400] = { 
        schema: {
          $ref: '#definitions/PostOrder_BadRequest'
       },
        description: "訂單資訊未填寫" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#definitions/PostOrder_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
          $ref: '#definitions/PostOrder_NotFound'
        },
        description: "訂單商品庫存不足" } */
  orderController.postOrder
)

module.exports = router
