'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carrier_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
         model: "carriers",
         key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tracking: {
        allowNull: true,
        type: Sequelize.STRING
      },
      delivery_address: {
        type: Sequelize.STRING
      },
      pickup_address: {
        type: Sequelize.STRING
      },
      status: {
        defaultValue: 'CREATED',
        type: Sequelize.ENUM('CREATED', 'IN TRANSIT', 'DELIVERED'),
        allowNull: false
      },
      created_at: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shipments');
  }
};