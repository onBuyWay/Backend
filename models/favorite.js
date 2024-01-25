'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      // define association here
    }
  }
  Favorite.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Favorite',
      underscored: true
    }
  )
  return Favorite
}
