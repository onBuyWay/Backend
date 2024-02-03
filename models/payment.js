'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Order, { foreignKey: 'orderId' })
    }
  }
  Payment.init(
    {
      orderId: DataTypes.INTEGER,
      paymentMethod: DataTypes.STRING,
      paidAt: DataTypes.DATE,
      params: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'Payments',
      underscored: true
    }
  )
  return Payment
}
