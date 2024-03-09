'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // 新增類別物件至資料庫
    await queryInterface.bulkInsert(
      'Categories',
      ['男裝', '女裝', '鞋子', '運動用品', '日常用品', '保健護理', '食品', '飲料', '3C', '娛樂'].map((categoryName) => ({
        name: categoryName,
        created_at: new Date(),
        updated_at: new Date()
      })),
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {})
  }
}
