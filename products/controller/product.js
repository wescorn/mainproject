const { models } = require('../config/sequalize');

const getAll = () => new Promise((resolve, reject) => {
    models.Product.findAll()
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