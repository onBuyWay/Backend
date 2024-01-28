const express = require('express')
const router = express.Router()
const cartController = require('../../../controllers/apis/cart-controller')

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

module.exports = router
