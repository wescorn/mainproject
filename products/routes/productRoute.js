const express = require('express');
const router = express.Router();
const productCtrl = require('../controller/product');

router.get('/getAllProducts', (req, res) => {
    productCtrl.getAll()
    .then((result) => {
        res.send({
            message: 'All products fetched',
            data: result,
        });
    })
    .catch((error) => {
        res.send({
            message: 'Some error occoured',
            error
        });
    });
});

module.exports = {
    router
};
