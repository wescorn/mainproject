'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Seed the products table
      return queryInterface.bulkInsert('Carriers', [
        {
          id:1,
          name: 'DHL',
        },
        {
          id:2,
          name: 'GLS',
        },
        {
          id:3,
          name: 'POST NORD',
        },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Remove seeded data from the products table
      return queryInterface.bulkDelete('Carriers', null, {});
    }
  };