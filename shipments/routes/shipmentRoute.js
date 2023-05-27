
const express = require('express');
const router = express.Router();
const shipmentController = require('../controller/shipment');

/**
* @swagger
* components:
*   schemas:
*     Shipment:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the shipment
*         deliveryAddress:
*           type: string
*           description: The delivery address of the shipment
*         pickupAddress:
*           type: string
*           description: The pickup address of the shipment
*         status:
*           type: string
*           description: The initial status of the shipment. options -> "CREATED", "IN TRANSIT", "DELIVERED"
*       example:
*         deliveryAddress: ReceipientAddressStreet 69, 1050 København
*         pickupAddress: CompanyAddressStreet 96, 6715 Esbjerg N
*         tracking: CFAT3D2SA6HJ654DA
*         status: CREATED
*         carrierId: 1
*         orderIds: [1, 5, 7]
*/


/**
* @swagger
* /shipments:
*   get:
*     summary: Lists all the shipments
*     tags: [Shipments]
*     responses:
*       200:
*         description: The list of the shipments
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Shipment'
*/
router.get('/', shipmentController.findAll);

/**
* @swagger
* /shipments/{id}:
*   get:
*     summary: Get the shipment by id
*     tags: [Shipments]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The shipment id
*     responses:
*       200:
*         description: The shipment response by id
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Shipment'
*       404:
*         description: The shipment was not found
*/
router.get('/:id', shipmentController.findOne);

/**
* @swagger
* /shipments:
*   post:
*     summary: Create a new shipment
*     tags: [Shipments]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Shipment'
*     responses:
*       200:
*         description: The created shipment.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Shipment'
*       500:
*         description: Some server error
*/
router.post('/', shipmentController.create),

/**
* @swagger
* /shipments/{id}:
*   put:
*    summary: Update the shipment by the id
*    tags: [Shipments]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: integer
*        required: true
*        description: The shipment id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Shipment'
*    responses:
*      200:
*        description: The shipment was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Shipment'
*      404:
*        description: The shipment was not found
*      500:
*        description: Some error happened
*/
router.put('/:id', shipmentController.update);

/**
* @swagger
* /shipments/{id}:
*   delete:
*     summary: Remove the shipment by id
*     tags: [Shipments]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The shipment id
*
*     responses:
*       200:
*         description: The shipment was deleted
*       404:
*         description: The shipment was not found
*/
router.delete('/:id', shipmentController.delete);

module.exports = router;


