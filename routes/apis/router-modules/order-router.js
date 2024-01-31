const express = require('express')
const router = express.Router()
const orderController = require('../../../controllers/apis/order-controller')

// 獲取所有訂單API
router.get(
  '/',
  /* #swagger.tags = ['Order']
       #swagger.description = '獲取所有訂單資訊' */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#/definitions/GetOrders_Success'
      },
        description: "成功獲取訂單資訊" } */
  /* #swagger.responses[200_no Order] = { 
        schema: {
          $ref: '#/definitions/GetOrders_NoOrder'
      },
        description: "無任何訂單" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#/definitions/GetOrders_Unauthorized'
        },
        description: "使用者未登入" } */
  orderController.getOrders
)

// 新增訂單API
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

// 取消訂單API
router.post(
  '/:orderId',
  /* #swagger.tags = ['Order']
       #swagger.description = '取消訂單' */
  /*	#swagger.parameters['orderId'] = {
              in: 'path',
              description: '訂單id',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#definitions/CancelOrder_Success'
        },
        description: "訂單新增成功" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#definitions/CancelOrder_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
          $ref: '#definitions/CancelOrder_NotFound'
        },
        description: "訂單已取消或是不存在" } */
  orderController.cancelOrder
)

module.exports = router
