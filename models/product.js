'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
