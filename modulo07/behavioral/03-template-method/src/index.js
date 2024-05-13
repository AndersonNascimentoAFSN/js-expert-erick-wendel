import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: 1,
  amount: 1000,
  products: [
    { description: 'Smartphone' }
  ]
})

const orderBusiness = new OrderBusiness()

console.info('orderCreated', orderBusiness.create(order))