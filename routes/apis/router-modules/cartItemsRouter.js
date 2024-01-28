const express = require('express')
const router = express.Router()
const cartController = require('../../../controllers/apis/cart-controller')

// 刪除購物車商品API
router.delete(
  '/:cartItemId',
  /* #swagger.tags = ['Cart']
       #swagger.description = '刪除購物車商品' */
  /*	#swagger.parameters['cartItemId'] = {
              in: 'path',
              description: '購物車物件id',
              type: 'integer',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
           $ref: '#definitions/DeleteCartItem_Success'
        },
        description: "成功刪除購物車商品" } */
  /* #swagger.responses[401] = { 
        schema: {
           $ref: '#definitions/DeleteCartItem_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
            $ref: '#definitions/DeleteCartItem_NotFound'
        },
        description: "找不到該物件" } */
  cartController.deleteCartItem
)

// 增加購物車商品數量API
router.post(
  '/:cartItemId/add',
  /* #swagger.tags = ['Cart']
       #swagger.description = '增加購物車商品數量(+1)' */
  /*	#swagger.parameters['cartItemId'] = {
              in: 'path',
              description: '購物車物件id',
              type: 'integer',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
           $ref: '#definitions/AddCartItem_Success'
        },
        description: "成功增加購物車商品數量" } */
  /* #swagger.responses[401] = { 
        schema: {
           $ref: '#definitions/AddCartItem_Unauthorized'
        },
        description: "使用者未登入" } */
  /* #swagger.responses[404] = { 
        schema: {
            $ref: '#definitions/AddCartItem_NotFound'
        },
        description: "商品庫存不足" } */
  cartController.addCartItem
)

// 扣除購物車商品數量API
router.post(
  '/:cartItemId/sub',
  /* #swagger.tags = ['Cart']
       #swagger.description = '扣除購物車商品數量(-1)' */
  /*	#swagger.parameters['cartItemId'] = {
              in: 'path',
              description: '購物車物件id',
              type: 'integer',
              required: true
      } */
  /* #swagger.responses[200] = { 
        schema: {
           $ref: '#definitions/SubCartItem_Success'
        },
        description: "成功扣除購物車商品數量" } */
  /* #swagger.responses[401] = { 
        schema: {
           $ref: '#definitions/SubCartItem_Unauthorized'
        },
        description: "使用者未登入" } */
  cartController.subCartItem
)

module.exports = router
