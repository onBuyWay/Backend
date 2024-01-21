'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'is_admin', {
      type: Sequelize.BOOLEAN
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'is_admin')
  }
}
