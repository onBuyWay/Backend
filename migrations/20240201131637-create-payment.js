'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.STRING
      },
      paid_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      params: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Payments')
  }
}
