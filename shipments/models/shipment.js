'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      this.belongsToMany(models.Order, {
        through: 'shipment_order',
        foreignKey: 'shipment_id',
        otherKey: 'order_id',
        as: 'orders',
      });

      this.belongsTo(models.Carrier, {
        foreignKey: 'carrier_id',
        as: 'carrier',
      });
    }

    checkForStatusUpdateFromCarrier() {
      //Send tracking request to carriers API
      // For simulation purposes, we just make some fake logic.
      return this.status == 'CREATED' ? 'IN TRANSIT' : 'DELIVERED';
    }


  };

  Shipment.init({
    carrier_id: {
      defaultValue:1,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    tracking: {
      type: DataTypes.STRING
    },
    delivery_address: {
      type: DataTypes.STRING
    },
    pickup_address: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('CREATED', 'IN TRANSIT', 'DELIVERED'),
      allowNull: false
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Date.now()
    }
    // Add more fields as per your product model requirements
  }, {
    sequelize,
    modelName: 'Shipment',
    tableName: 'shipments',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['created_at', 'updated_at'] },
    }
  });

  return Shipment
};