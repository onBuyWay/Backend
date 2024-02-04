'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      stock_quantity: {
        type: Sequelize.INTEGER
      },
      cost_price: {
        type: Sequelize.INTEGER
      },
      sell_price: {
        type: Sequelize.INTEGER
      },
      product_status: {
        type: Sequelize.STRING
      },
      category_id: {
        references: {
          model: 'Categories',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products')
  }
}
