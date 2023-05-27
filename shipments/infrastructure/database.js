const { exec } = require('child_process');
const mysql = require('mysql2');

function initialize() {
  // create db if it doesn't already exist
  const connection = mysql.createConnection({
    host: "mysqldb",
    user: 'root',
    password: 'admin',
  });
    
  connection.query('CREATE DATABASE IF NOT EXISTS shipments;');
  exec("npm run migrate");
  exec("npm run seed")
}


module.exports = {
  initialize
};