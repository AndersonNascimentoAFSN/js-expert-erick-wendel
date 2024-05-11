/*
  ProductId: should be between 1 and 20 characters 
  Name: should be only words
  Price: should be from zero to thousand
  Category: should be electronics or organic
*/

function productValidator(product) {
  const errors = new Map()

  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    errors.set('id', `ProductId: invalid length, current [${product.id}] expected to be between 2 and 20 characters`)
  }

  if (RegExp(/\W|\d/g).test(product.name)) {
    errors.set('name', `ProductName: invalid value, current [${product.name}] expected to have only words`)
  }

  if (!(product.price >= 1 && product.price <= 1000)) {
    errors.set('price', `ProductPrice: invalid value, current [${product.price}] expected number to be between 0 and 1000`)
  }

  if (!(['electronic', 'organic'].includes(product.category))) {
    errors.set('category', `ProductCategory: invalid value, current [${product.category}] expected to have only electronics or organic as category`)
  }


  return {
    result: errors.size === 0,
    errors,
  }
}

module.exports = {
  productValidator
}