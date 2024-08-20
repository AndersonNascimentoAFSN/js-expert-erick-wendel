import Product from "../../src/entities/product.js";

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const result = []

    for (const product of products) {
      const keys = Reflect.ownKeys(product)
      if (!keys.length) continue


      // 1st way
      // result.push(JSON.parse(JSON.stringify(new Product(product)))) 

      // 2nd way
      // keys.forEach(key => product[key] || delete product[key])
      // keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
      // result.push(new Product(product))

      // 3rd way
      let newObject = {}

      keys.forEach(key => {
        if (!keys[key]) return
        newObject[key] = keys[key]
      })
      result.push(new Product(product))
    }

    return result
  }
}