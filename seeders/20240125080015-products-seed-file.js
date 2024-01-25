'use strict'
const { faker } = require('@faker-js/faker')
module.exports = {
  async up(queryInterface, Sequelize) {
    // 獲取所有類別id
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    )
    await queryInterface.bulkInsert(
      'Products',
      Array.from({ length: 30 }, () => ({
        name: faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({ category: 'product' }),
        description: faker.commerce.productDescription(),
        stock_quantity: Math.floor(Math.random() * 200),
        cost_price: Math.floor(Math.random() * 500),
        sell_price: Math.floor(Math.random() * 200) + 500,
        product_status: true,
        category_id:
          categories[Math.floor(Math.random() * categories.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', {})
  }
}
