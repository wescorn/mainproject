const ShipmentDTO = require("../models/DTO/shipment.dto");
const { Shipment } = require("../models");
const { pickKeys } = require('./util');

class DTOHelper {
    static MakeShipmentDTO(product, keys = ['id','delivery_address','pickup_address','status', 'carrier_id', 'tracking', 'order_ids', 'orders', 'carrier']) {
        return new ShipmentDTO(pickKeys(product, keys));
    }
    static MakeShipment(dto, keys = ['id','delivery_address','pickup_address','status', 'carrier_id', 'tracking']) {
        return Shipment.build(pickKeys(dto, keys));
    }
}


module.exports = DTOHelper;