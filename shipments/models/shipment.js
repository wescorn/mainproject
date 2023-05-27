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
        through: 'ShipmentOrder',
        foreignKey: 'shipmentId',
        otherKey: 'orderId',
        as: 'orders',
      });

      this.belongsTo(models.Carrier, {
        foreignKey: 'carrierId',
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
    carrierId: {
      defaultValue:1,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    tracking: {
      type: DataTypes.STRING
    },
    deliveryAddress: {
      type: DataTypes.STRING
    },
    pickupAddress: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('CREATED', 'IN TRANSIT', 'DELIVERED'),
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
    // Add more fields as per your product model requirements
  }, {
    sequelize,
    modelName: 'Shipment',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    }
  });

  return Shipment
};