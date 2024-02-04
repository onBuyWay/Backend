'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' })
      Order.belongsToMany(models.Product, {
        through: models.OrderItem,
        foreignKey: 'orderId',
        as: 'orderProducts'
      })
      Order.hasMany(models.Payment, { foreignKey: 'orderId' })
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      sn: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
      shippingStatus: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders',
      underscored: true
    }
  )
  return Order
}
