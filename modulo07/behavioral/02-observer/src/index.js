import Payment from "./events/payments.js"
import Marketing from "./observers/marketing.js"
import PaymentSubject from "./subjects/paymentSubject.js"
import Shipment from "./observers/shipment.js"

const subject = new PaymentSubject()

const marketing = new Marketing()
subject.subscribe(marketing)

const shipment = new Shipment()
subject.subscribe(shipment)

const payment = new Payment(subject)
payment.creditCard({ userName: 'andersonnascimento', id: Date.now() })

subject.unsubscribe(marketing)

// Só vai disparar para a área de shipment 
payment.creditCard({ userName: 'mariazinha', id: Date.now() })