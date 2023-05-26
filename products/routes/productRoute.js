
const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

/**
* @swagger
* components:
*   schemas:
*     Product:
*       type: object
*       required:
*         - name
*         - price
*         - stock
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the product
*         name:
*           type: string
*           description: The name of the product
*         price:
*           type: double
*           description: The price of the product
*         stock:
*           type: integer
*           description: The current stock of the product
*       example:
*         name: Duct tape
*         price: 70
*         stock: 22
*/

/**
* @swagger
* /products:
*   get:
*     summary: Lists all the products
*     tags: [Products]
*     responses:
*       200:
*         description: The list of the products
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Product'
*/
router.get('/', productController.findAll);

/**
* @swagger
* /products/{id}:
*   get:
*     summary: Get the product by id
*     tags: [Products]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product id
*     responses:
*       200:
*         description: The product response by id
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: The product was not found
*/
router.get('/:id', productController.findOne);

/**
* @swagger
* /products:
*   post:
*     summary: Create a new product
*     tags: [Products]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Product'
*     responses:
*       200:
*         description: The created product.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       500:
*         description: Some server error
*/
router.post('/', productController.create),

/**
* @swagger
* /products/{id}:
*   put:
*    summary: Update the product by the id
*    tags: [Products]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: integer
*        required: true
*        description: The product id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Product'
*    responses:
*      200:
*        description: The product was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Product'
*      404:
*        description: The product was not found
*      500:
*        description: Some error happened
*/
router.put('/:id', productController.update);

/**
* @swagger
* /products/{id}:
*   delete:
*     summary: Remove the product by id
*     tags: [Products]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product id
*
*     responses:
*       200:
*         description: The product was deleted
*       404:
*         description: The product was not found
*/
router.delete('/:id', productController.delete);

module.exports = router;


