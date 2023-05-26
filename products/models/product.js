'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      // define association here
    }

  };

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      defaultValue: 0.0,
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      defaultValue: 0,
      type: DataTypes.NUMBER,
      allowNull: false
    },
    // Add more fields as per your product model requirements
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    }
  });

  return Product
};