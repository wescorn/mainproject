const { exec } = require('child_process');
const mysql = require('mysql2');

function initialize() {
  // create db if it doesn't already exist
  const connection = mysql.createConnection({
    host: "mysqldb",
    user: 'root',
    password: 'admin',
  });
    
  connection.query('CREATE DATABASE IF NOT EXISTS products;');
  exec("npm run migrate");
  exec("npm run seed")
}

function adjustProductStock(orderDto) {
  const connection = mysql.createConnection({
    host: "mysqldb",
    user: 'root',
    password: 'admin',
  });

  if(orderDto.Status == "delivered"){
    orderDto.OrderLines.forEach((orderLine) => {
      connection.query('CALL AdjustProductStock(?, ?)', {
        replacements: [orderLine.ProductId, orderLine.Quantity],
      });
    });
  }
}

module.exports = {
  initialize,
  adjustProductStock
};