import { expect, describe, it, jest, beforeAll } from '@jest/globals'
import PaymentSubject from '../src/subjects/paymentSubject.js'
import Payment from '../src/events/payments.js'
import Shipment from '../src/observers/shipment.js'
import Marketing from '../src/observers/marketing.js'

describe('Test Suite for Observer Pattern', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { })
  })

  describe('Test Suit #PaymentSubject', () => {
    it('#PaymentSubject notify observers', () => {
      const subject = new PaymentSubject()
      const observer = {
        update: jest.fn()
      }
      const data = 'Hello World'
      const expected = data

      subject.subscribe(observer)
      subject.notify(data)

      expect(observer.update).toHaveBeenCalledWith(expected)
    })
    it('#PaymentSubject should not notify unsubscribe observers', () => {
      const subject = new PaymentSubject()
      const observer = {
        update: jest.fn()
      }
      const data = 'Hello World'

      subject.subscribe(observer)
      subject.unsubscribe(observer)
      subject.notify(data)

      expect(observer.update).not.toHaveBeenCalled()
    })
  })
  describe('Test Suit #Payment', () => {
    it('#Payment should notify subject after a credit card transaction', () => {
      const subject = new PaymentSubject()
      const payment = new Payment(subject)

      const paymentSubjectNotifySpy = jest.spyOn(payment.paymentSubject, 'notify')

      const data = { userName: 'andersonnascimento', id: Date.now() }

      payment.creditCard(data)

      expect(paymentSubjectNotifySpy).toHaveBeenCalled()
      expect(paymentSubjectNotifySpy).toHaveBeenCalledWith(data)
      expect(console.log).toHaveBeenCalledWith(`\ payment ocurred from ${data.userName}`)
    })
  })
  it('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()

    const shipment = new Shipment()
    const marketing = new Marketing()

    const shipmentUpdateSpy = jest.spyOn(shipment, 'update')
    const marketingUpdateSpy = jest.spyOn(marketing, 'update')

    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const payment = new Payment(subject)

    const data = { userName: 'andersonnascimento', id: Date.now() }

    payment.creditCard(data)

    expect(shipmentUpdateSpy).toHaveBeenCalled()
    expect(shipmentUpdateSpy).toHaveBeenCalledWith(data)
    expect(marketingUpdateSpy).toHaveBeenCalled()
    expect(marketingUpdateSpy).toHaveBeenCalledWith(data)
  })
})