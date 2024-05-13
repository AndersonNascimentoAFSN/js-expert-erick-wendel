import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import Order from '../src/entities/order.js'
import OrderBusiness from '../src/business/orderBusiness.js'

describe('Test Suite for Template Method design pattern', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe.only('#OrderBusiness', () => {
    describe('execution order Business without template method', () => {
      it('should be create an order', () => {
        const order = new Order({
          customerId: 1,
          amount: 1000,
          products: [
            { description: 'Smartphone' }
          ]
        })

        const orderBusiness = new OrderBusiness()
        // Todos devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execução. Se algum esquecer de chamar a função de validação, pode quebrar todo o sistema.
        const isValid = orderBusiness._validateRequiredFields(order)

        expect(isValid).toBeTruthy()

        const result = orderBusiness._create(order)
        expect(result).toBeTruthy()
      })
      it('should not be create an order', () => {
        const order = new Order({
          customerId: 1,
          products: [
            { description: 'Smartphone' }
          ]
        })

        const orderBusiness = new OrderBusiness()
        // Todos devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execução. Se algum esquecer de chamar a função de validação, pode quebrar todo o sistema.

        expect(() => orderBusiness._validateRequiredFields(order)).toThrow('The field \'amount\' is mandatory')
      })
    })
    it('execution order Business with template method', () => {
      const order = new Order({
        customerId: 1,
        amount: 1000,
        products: [
          { description: 'Smartphone' }
        ]
      })
      const orderBusiness = new OrderBusiness()

      const calledValidationFn = jest
        .spyOn(
          orderBusiness,
          orderBusiness._validateRequiredFields.name
        )
      const calledCreateFn = jest
        .spyOn(
          orderBusiness,
          orderBusiness._create.name
        )

      // Com template method, a sequência de passos é sempre executada. Isso evita a replicação de lógica e garante que todos os passos sejam executados.
      const result = orderBusiness.create(order)

      expect(result).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()
    })
  })
})