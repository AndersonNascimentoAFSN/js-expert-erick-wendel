import BaseBusiness from "./base/baseBusiness.js"

export default class OrderBusiness extends BaseBusiness {
  #order = new Set()

  _validateRequiredFields(data) {
    const requiredFields = ['customerId', 'amount', 'products']

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`The field '${field}' is mandatory`)
      }
    }

    return true
  }

  _create(data) {
    this.#order.add(data)
    return true
  }
}