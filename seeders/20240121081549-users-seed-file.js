'use strict'
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'user1',
          email: 'user1@example.com',
          password: await bcrypt.hash('123', 10),
          phone: faker.phone.number(),
          birthday: faker.date.birthdate({
            min: 1950,
            max: 2010,
            mode: 'year'
          }),
          gender: 'male',
          address: faker.location.streetAddress(),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'user2',
          email: 'user2@example.com',
          password: await bcrypt.hash('123', 10),
          phone: faker.phone.number(),
          birthday: faker.date.birthdate({
            min: 1950,
            max: 2010,
            mode: 'year'
          }),
          gender: 'female',
          address: faker.location.streetAddress(),
          is_admin: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'admin1',
          email: 'admin1@example.com',
          password: await bcrypt.hash('123', 10),
          phone: faker.phone.number(),
          birthday: faker.date.birthdate({
            min: 1950,
            max: 2010,
            mode: 'year'
          }),
          gender: 'male',
          address: faker.location.streetAddress(),
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
