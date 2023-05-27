'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      //reference: {
      //  type: Sequelize.INTEGER,
      //  allowNull: false,
      //  unique: true,
      //},
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('ShipmentOrder', {
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      shipmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Shipments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ShipmentOrder');
    await queryInterface.dropTable('Orders');
  },
};