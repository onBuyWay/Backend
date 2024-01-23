'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      stockQuantity: DataTypes.INTEGER,
      costPrice: DataTypes.INTEGER,
      sellPrice: DataTypes.INTEGER,
      productStatus: DataTypes.BOOLEAN,
      categoryId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'Products',
      underscored: true
    }
  )
  return Product
}
