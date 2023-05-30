'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carrier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
        // Carrier has many Shipments
      this.hasMany(models.Shipment, {
        foreignKey: 'carrier_id',
        as: 'shipments',
      });
    }

  };

  Carrier.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Carrier',
    tableName: 'carriers',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['created_at', 'updated_at'] },
    }
  });

  return Carrier
};