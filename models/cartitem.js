'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {}
  }
  CartItem.init(
    {
      quantity: DataTypes.INTEGER,
      cartId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'CartItem',
      tableName: 'CartItems',
      underscored: true
    }
  )
  return CartItem
}
