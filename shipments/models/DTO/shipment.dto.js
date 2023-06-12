class ShipmentDTO {
  constructor({delivery_address, pickup_address, status, id, order_ids, tracking, carrier_id, orders, carrier}) {
    this.delivery_address = delivery_address;
    this.pickup_address = pickup_address;
    this.status = status;
    this.id = id;
    this.tracking = tracking;
    this.carrier_id = carrier_id;
    this.carrier = carrier;
    this.order_ids = order_ids;
    this.orders = orders;
  }
}

module.exports = ShipmentDTO;
