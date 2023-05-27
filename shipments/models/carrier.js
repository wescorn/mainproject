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
        foreignKey: 'carrierId',
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
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    }
  });

  return Carrier
};