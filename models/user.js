'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Cart, { foreignKey: 'userId' })
      User.belongsToMany(models.Product, {
        through: models.Favorite,
        foreignKey: 'userId',
        as: 'FavoritedProducts'
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthday: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true
    }
  )
  return User
}
