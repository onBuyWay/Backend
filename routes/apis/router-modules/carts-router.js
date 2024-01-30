const express = require('express')
const router = express.Router()
const cartController = require('../../../controllers/apis/cart-controller')

// 查看購物車商品API
router.get(
  '/',
  /* #swagger.tags = ['Cart']
       #swagger.description = '查看購物車商品' */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#definitions/GetCart_Success'
        },
        description: "成功獲取購物車資訊" } */
  /* #swagger.responses[200_CartIsEmpty] = { 
        schema: {
          $ref: '#definitions/GetCart_Success_Empty'
        },
        description: "成功獲取購物車資訊(無商品)" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#definitions/GetCart_Unauthorized'
        },
        description: "使用者未登入" } */
  cartController.getCart
)

// 確認購物車商品API
router.get(
  '/check',
  /* #swagger.tags = ['Cart']
       #swagger.description = '查看購物車商品' */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#definitions/CheckCart_Success'
        },
        description: "成功獲取購物車資訊" } */
  /* #swagger.responses[400] = { 
        schema: {
          $ref: '#definitions/CheckCart_BadRequest'
        },
        description: "購物車內無商品" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#definitions/CheckCart_Unauthorized'
        },
        description: "使用者未登入" } */
  cartController.checkCart
)

// 新增商品至購物車
router.post(
  '/:productId',
  /* #swagger.tags = ['Cart']
       #swagger.description = '新增商品至購物車' */
  /*	#swagger.parameters['productId'] = {
              in: 'path',
              description: '商品id',
              type: 'integer',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
          $ref: '#definitions/PostCart_Success'
        },
        description: "商品類別註冊成功" } */
  /* #swagger.responses[401] = { 
        schema: {
          $ref: '#definitions/PostCart_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
          $ref: '#definitions/PostCart_NotFound'
        },
        description: "商品庫存不足" } */
  cartController.postCart
)

module.exports = router
