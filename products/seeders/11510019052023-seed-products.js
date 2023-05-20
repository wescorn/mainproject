'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Seed the products table
      return queryInterface.bulkInsert('products', [
        {
          name: 'Product 1',
          price: 10.99,
          stock: 5
        },
        {
          name: 'Product 2',
          price: 19.99,
          stock: 1
        },
        // Add more seed data as needed
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Remove seeded data from the products table
      return queryInterface.bulkDelete('products', null, {});
    }
  };