const db = require("../models");
const Product = db.Product;
const Op = db.Sequelize.Op;
const DTOHelper = require('../helpers/DTOHelper');


exports.create = (req, res) => {
    const dto = DTOHelper.MakeProductDTO(req.body, ['name', 'price', 'stock']);
    DTOHelper.MakeProduct(dto).save().then(product => {
        resDto = DTOHelper.MakeProductDTO(product);
        res.send(resDto);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Product."
        });
    });
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Product.findAll({ where: condition })
        .then(products => {
            products = products.map(product => DTOHelper.MakeProductDTO(product))
            res.send(products);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then(product => {
            if (product) {
                res.send(DTOHelper.MakeProductDTO(product));
            } else {
                res.status(404).send({
                    message: `Cannot find Product with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving Product with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    
    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};
