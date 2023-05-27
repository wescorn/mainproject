const { InitConnection, PublishMessage, StartPublisher } = require('./rabbitmq');
const db = require("../models");
const { Op } = require('sequelize');
const { Shipment } = db;

const simulateShipmentUpdates = async (interval = 15) => {
    console.log('Simulating Shipment Updates!');
    setInterval(function() {
        Shipment.findAll({
          where: {
            status: {
              [Op.ne]: 'DELIVERED'
            },
            tracking: {
              [Op.not]: null
            }
          }
        }).then(shipments => {
            console.log(`Found ${shipments.length} undelivered shipments!`);
            InitConnection(() => {
                return StartPublisher().then(() => {
                    shipments.forEach(shipment => {
                        const newStatus = shipment.checkForStatusUpdateFromCarrier();
                        const oldStatus = shipment.status;
                        if (newStatus != oldStatus) {
                            shipment.update({ status: newStatus }).then(shipment => {
                                if (shipment.status == newStatus && shipment.status != oldStatus) {
                                    console.log(`succesfully updated shipment(${shipment.id}) status from ${oldStatus} to ${newStatus} !`);
                                    shipment.getOrders().then(orders => {
                                        console.log(`Published ShipmentStatusChanged message for orders:(${orders.map(order => order.id).join(',')}). Shipment status changed from ${oldStatus} to ${newStatus}`);
                                        PublishMessage('OrderExchange', 'ShipmentStatusChangedQueue', 'shipment', JSON.stringify({
                                            id: shipment.id,
                                            orderIds: orders.map(order => order.id),
                                            from: oldStatus,
                                            to: newStatus
                                        }));
                                    });
                                    
                                }
                            });
                        }
                    });
                })
            })
        })
        .catch(err => {
            console.log(err);
        });
    }, interval * 1000);
}

module.exports = { 
    simulateShipmentUpdates
}