'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId' })
      Cart.belongsToMany(models.Product, {
        through: models.CartItem,
        foreignKey: 'cartId',
        as: 'cartProducts'
      })
    }
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Cart',
      tableName: 'Carts',
      underscored: true
    }
  )
  return Cart
}
