'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Seed the products table
      return queryInterface.bulkInsert('shipments', [
        {
          "delivery_address": "ReceipientAddressStreet 69, 1050 København",
          "pickup_address": "CompanyAddressStreet 33, 6715 Esbjerg N",
          "tracking": "CFAT7D2SA6HJ654DA",
          "status": "CREATED",
          "carrier_id": 1
        },
        {
          "delivery_address": "ReceipientAddressStreet 22, 1050 København",
          "pickup_address": "CompanyAddressStreet 22, 6715 Esbjerg N",
          "tracking": "CFAT3D3SA6HJ654DA",
          "status": "CREATED",
          "carrier_id": 1
        },
        {
          "delivery_address": "ReceipientAddressStreet 44, 1050 København",
          "pickup_address": "CompanyAddressStreet 11, 6715 Esbjerg N",
          "tracking": "CFAT3D2SA6YJ654DA",
          "status": "CREATED",
          "carrier_id": 1
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Remove seeded data from the products table
      return queryInterface.bulkDelete('shipments', null, {});
    }
  };