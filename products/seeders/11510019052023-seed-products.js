'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Seed the products table
      return queryInterface.bulkInsert('products', [
        {
          name: 'Product 1',
          price: 19.99,
          stock: 3
        },
        {
          name: 'Product 2',
          price: 16.99,
          stock: 5
        },
        {
          name: 'Product 3',
          price: 13.99,
          stock: 2
        },
        {
          name: 'Product 4',
          price: 12.99,
          stock: 9
        },
        {
          name: 'Product 5',
          price: 11.99,
          stock: 6
        },
        // Add more seed data as needed
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Remove seeded data from the products table
      return queryInterface.bulkDelete('products', null, {});
    }
  };