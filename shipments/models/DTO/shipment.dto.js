class ShipmentDTO {
  constructor({deliveryAddress, pickupAddress, status, id, orderIds, tracking, carrierId}) {
    this.deliveryAddress = deliveryAddress;
    this.pickupAddress = pickupAddress;
    this.status = status;
    this.id = id;
    this.tracking = tracking;
    this.carrierId = carrierId;
    this.orderIds = orderIds;
  }
}

module.exports = ShipmentDTO;
