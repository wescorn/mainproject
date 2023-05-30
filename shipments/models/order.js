'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      // Order belongs to many Shipments
      this.belongsToMany(models.Shipment, {
        through: 'shipment_order',
        foreignKey: 'order_id',
        otherKey: 'shipment_id',
        as: 'shipments',
      });
    }

  };

  Order.init({
    //reference: {
    //  type: DataTypes.INTEGER,
    //  allowNull: false,
    //  unique: true,
    //},
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['created_at', 'updated_at'] },
    }
  });

  return Order
};