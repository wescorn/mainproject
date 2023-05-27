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
                            shipment.update({ status: newStatus }).then(success => {
                                if (success == 1) {
                                    console.log(`succesfully updated shipment(${shipment.id}) status from ${oldStatus} to ${newStatus} !`);
                                    PublishMessage('OrderExchange', 'shipments', {
                                        id: shipment.id,
                                        orderIds: shipment.getOrders().map(order => order.id),
                                        from: oldStatus,
                                        to: newStatus
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