'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carrierId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
         model: "Carriers",
         key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tracking: {
        allowNull: true,
        type: Sequelize.STRING
      },
      deliveryAddress: {
        type: Sequelize.STRING
      },
      pickupAddress: {
        type: Sequelize.STRING
      },
      status: {
        defaultValue: 'CREATED',
        type: Sequelize.ENUM('CREATED', 'IN TRANSIT', 'DELIVERED'),
        allowNull: false
      },
      createdAt: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shipments');
  }
};