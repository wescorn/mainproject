const ShipmentDTO = require("../models/DTO/shipment.dto");
const { Shipment } = require("../models");
const { pickKeys } = require('./util');

class DTOHelper {
    static MakeShipmentDTO(product, keys = ['id','deliveryAddress','pickupAddress','status', 'carrierId', 'tracking', 'orderIds']) {
        return new ShipmentDTO(pickKeys(product, keys));
    }
    static MakeShipment(dto, keys = ['id','deliveryAddress','pickupAddress','status', 'carrierId', 'tracking']) {
        return Shipment.build(pickKeys(dto, keys));
    }
}


module.exports = DTOHelper;