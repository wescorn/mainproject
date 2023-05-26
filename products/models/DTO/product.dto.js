class ProductDTO {
  constructor({name, price, stock, id}) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.id = id;
  }
}

module.exports = ProductDTO;
