const db = require("../models");
const { Shipment, Order } = db;
const Op = db.Sequelize.Op;
const DTOHelper = require('../helpers/DTOHelper');


exports.create = async (req, res) => {
    try {
        // Extract the required attributes from the request body
        const { orderIds } = req.body;
        const dto = DTOHelper.MakeShipmentDTO(req.body, ['deliveryAddress','pickupAddress','status','tracking', 'carrierId']);
        
        // Find existing orders among the provided orderIds
        const existingOrders = await Order.findAll({
          where: { id: { [Op.in]: orderIds } },
        });
    
        // Extract the existing orderIds
        const existingOrderIds = existingOrders.map((order) => order.id);
    
        // Find the new orderIds that don't exist
        const newOrderIds = orderIds.filter((orderId) => {
          return !existingOrderIds.includes(orderId);
        });
    
        // Create new orders in a single query
        const createdOrders = [];
        if (newOrderIds.length > 0) {
          const newOrders = await Order.bulkCreate(
            newOrderIds.map((orderId) => ({ id: orderId }))
          );
          createdOrders.push(...newOrders);
        }
    
        // Find the associated orders (existing and newly created)
        const associatedOrders = existingOrders.concat(createdOrders);
        // Create the Shipment and associate the orders
        await DTOHelper.MakeShipment(dto).save().then(async shipment => {
            await shipment.addOrders(associatedOrders);
            //resDto = DTOHelper.MakeShipmentDTO(shipment);
            res.send(shipment);
        });
      } catch (error) {
        console.error('Error creating shipment:', error);
        res.status(500).json({ error: 'Failed to create shipment.' });
      }
}



exports.findAll = (req, res) => {
    Shipment.findAll()
        .then(shipments => {
            console.log('SHIPMENTS', shipments);
            shipments = shipments.map(shipment => DTOHelper.MakeShipmentDTO(shipment))
            res.send(shipments);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving shipments."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Shipment.findByPk(id)
        .then(shipment => {
            if (shipment) {
                res.send(DTOHelper.MakeShipmentDTO(shipment));
            } else {
                res.status(404).send({
                    message: `Cannot find Shipment with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving Shipment with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    
    Shipment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Shipment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Shipment with id=${id}. Maybe Shipment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Shipment with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Shipment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Shipment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Shipment with id=${id}. Maybe Shipment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Shipment with id=" + id
            });
        });
};
