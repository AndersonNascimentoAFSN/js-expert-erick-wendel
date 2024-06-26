const Product = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    // O default são os dados corretos. O caso de sucesso!
    this.productData = {
      id: '000001',
      name: "computer",
      price: 1000,
      category: "electronic",
    };
  }

  static aProduct() {
    return new ProductDataBuilder();
  }

  withInvalidId() {
    this.productData.id = '1'
    return this
  }

  withInvalidName() {
    this.productData.name = 'abc123'
    return this
  }

  withInvalidPrice() {
    this.productData.price = -10
    return this
  }

  withInvalidCategory() {
    this.productData.category = 'domestic'
    return this
  }

  build() {
    const product = new Product(this.productData)
    return product
  }
}

module.exports = ProductDataBuilder