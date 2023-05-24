const db = require('../models');

const getAll = () => new Promise((resolve, reject) => {
    db.Product.findAll()
    .then((products) => {
        resolve(products);
    })
    .catch((error) => {
        reject(error);
    });
});

module.exports = {
    getAll
}