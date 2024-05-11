const { expect } = require('chai')
const { describe, it } = require('mocha')
const { productValidator } = require('../src')
const ProductMotherObject = require('./model/productMotherObject')

describe('Test Mother Object', () => {
  it('should don\'t return error with valid product', () => {
    const product = ProductMotherObject.valid()

    const result = productValidator(product)

    const expected = {
      errors: new Map(),
      result: true
    }

    expect(result).to.be.deep.equal(expected)
    // expect(result).to.be.true
    // expect(errors.length).to.be.equal(0)
  })

  describe('Product Validation Rules', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductMotherObject.withInvalidId()

      const result = productValidator(product)
  
      const expected = {
        errors: new Map([
          ['id', 'ProductId: invalid length, current [1] expected to be between 2 and 20 characters']
        ]),
        result: false
      }
  
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductMotherObject.withInvalidName()

      const result = productValidator(product)
  
      const expected = {
        errors: new Map([
          ['name', 'ProductName: invalid value, current [abc123] expected to have only words']
        ]),
        result: false
      }
  
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductMotherObject.withInvalidPrice()

      const result = productValidator(product)
  
      const expected = {
        errors: new Map([
          ['price', 'ProductPrice: invalid value, current [-10] expected number to be between 0 and 1000']
        ]),
        result: false
      }
  
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an object error when creating a Product with invalid category', () => {
      const product = ProductMotherObject.withInvalidCategory()

      const result = productValidator(product)
  
      const expected = {
        errors: new Map([
          ['category', 'ProductCategory: invalid value, current [domestic] expected to have only electronics or organic as category']
        ]),
        result: false
      }
  
      expect(result).to.be.deep.equal(expected)
    })
  })
})
