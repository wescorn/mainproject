const models = {
    Product: require('../models/product')(sequelize, Sequelize),
    Product: require('../models/user')(sequelize, Sequelize),
    // Add other models here
  };

module.exports = models;