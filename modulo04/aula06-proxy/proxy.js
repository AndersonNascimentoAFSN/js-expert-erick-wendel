'use strict'

const Event = require('events')
const event = new Event()

const eventName = 'counter'

event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },
  get: (object, prop) => {
    return object[prop]
  }
})

// ja já e para sempre!
setInterval(function () {
  proxy.counter += 1
  console.log('[3]: interval')
  if (proxy.counter === 10) clearInterval(this)
}, 200)

// Sempre usado para o futuro
setTimeout(() => {
  proxy.counter = 4
  console.log('[2]: timeout')
}, 0)

// Se quero que execute instantaneamente
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter)
  // proxy.counter = 1
})

// Executa agora, agorinha, mas acaba com o ciclo de vida do node

process.nextTick(() => {
  console.log('[0]: nextTick')
  proxy.counter = 2
})