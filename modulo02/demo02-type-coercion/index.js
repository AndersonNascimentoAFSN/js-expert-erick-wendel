'use strict'

const { deepStrictEqual } = require('assert')

console.log('true + 2', true + 2)
console.log('true - 2', true - 2)
console.log("'21' + true", '21' + true)
console.log("'21' - true", '21' - true)
console.log("9999999999999999", 9999999999999999)
console.log("0.1 + 0.2", 0.1 + 0.2)
console.log("0.1 + 0.2 === 0.3", 0.1 + 0.2 === 0.3)
console.log("3 > 2", 3 > 2)
console.log("2 > 1", 2 > 1)
console.log("3 > 2 > 1", 3 > 2 > 1)
console.log("3 > 2 >= 1", 3 > 2 >= 1)
console.log("3 > 2 && 2 > 1", 3 > 2 && 2 > 1)
console.log("'21' - -1", '21' - -1)
console.log("'1' == 1", '1' == 1)
console.log("'1' === 1", '1' === 1)

// ----------------------------------------------------------------
// console.log('String(123', String(123))

console.assert(String(123) === '123', 'explicit conversion to string')
console.assert(123 + '' === '123', 'explicit conversion to string')

if ('hello' || 1) {
  console.log('ae!')
}

console.assert(('hello' || 123) === 'hello', '|| returns the first truthy value if first value is truthy')
console.assert(('hello' && 123) === 123, '&& returns the last truthy value if last value is truthy')


// ----------------------------------------------------------------

const item = {
  name: 'Guilherme',
  age: 26,
  // string: Chamará primeiro se for string, Se não for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: Chamará primeiro se for um number, se não for primitivo, chama o toString
  valueOf() {
    // return this.age
    return { hey: 'dude' }
  },
  // Tem prioridade sobre os outros dois acima!
  [Symbol.toPrimitive](coercionType) {
    console.log('Trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }
    return types[coercionType] || types.string
  }
}

// console.log('toString', String(item))
// // Vai retornar NaN, pois o toString retornou a string 
// console.log('valueOf', Number(item))

// Depois de adicionar o toPrimitive, ele chama o Symbol.toPrimitive
console.log('String', String(item))
console.log('Number', Number(item))
// Chama conversão default!
console.log('Date', new Date(item))