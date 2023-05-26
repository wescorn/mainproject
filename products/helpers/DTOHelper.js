const ProductDTO = require("../models/DTO/product.dto");
const { Product } = require("../models");
const { pickKeys } = require('./util');

class DTOHelper {
    static MakeProductDTO(product, keys = ['id','name','price','stock']) {
        return new ProductDTO(pickKeys(product, keys));
    }
    static MakeProduct(dto, keys = ['id', 'name', 'price', 'stock']) {
        return Product.build(pickKeys(dto, keys));
    }
}


module.exports = DTOHelper;