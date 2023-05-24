const models = {
    Product: require('../models/product')(sequelize, Sequelize),
    // Add other models here
  };

module.exports = models;