'use strict'

const { deepStrictEqual } = require('assert')

let counter = 0
let counter2 = counter

counter2++

const item = { counter: 0 }
const item2 = item

item2.counter++

{
  // tipo primitivo gera uma cópia em memória
  deepStrictEqual(counter, 0)
  deepStrictEqual(counter2, 1)
}

{
  // tipo de referência, aponta para o mesmo local em memória
  deepStrictEqual(item, { counter: 1 })
  deepStrictEqual(item2, { counter: 1 })
}

