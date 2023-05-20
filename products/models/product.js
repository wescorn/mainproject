const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you've configured sequelize connection

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
  // Add more fields as per your product model requirements
});

module.exports = Product;