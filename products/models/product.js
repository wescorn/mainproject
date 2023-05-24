const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = require('../config/sequalize'); // Assuming you've configured sequelize connection

const sequelize = new Sequelize(
  'productsdb',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
   {
     host: 'DATABASE_HOST',
     dialect: 'mysql'
   }
 );
 
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
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

sequelize.sync().then(() => {
  console.log('product table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Product;