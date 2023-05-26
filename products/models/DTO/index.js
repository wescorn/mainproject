const fs = require('fs');
const path = require('path');

dtomodels = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-7) === '.dto.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    dtomodels[model.name] = model;
  });

module.exports = dtomodels;