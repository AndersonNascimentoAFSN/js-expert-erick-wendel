const assert = require('assert')

// --keys

const uniqueKeys = Symbol("userName")
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKeys] = 'value for Symbol'

// console.log(user.userName)

// Sempre único em nível de endereço de memória
// console.log(user[Symbol("userName")])
// console.log(user[uniqueKeys])

assert.deepStrictEqual(user.userName, 'value for normal Objects')
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKeys], 'value for Symbol')

// É dificil de pegar, mas não é secreto
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKeys)

// --keys

// Well known symbols

const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

// for (const key of obj) {
//   console.log('key', key)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')

class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  get [Symbol.toStringTag]() {
    return 'WHAT??'
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()
    const items = this[kItems].map(item => new Intl.DateTimeFormat('pt-BR', {
      month: 'long', day: '2-digit', year: 'numeric'
    }).format(item))

    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
}

const myDate = new MyDate(
  [2020, 3, 1],
  [2019, 2, 2]
)

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2019, 2, 2)
]

console.log(myDate)

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT??]')
assert.throws(() => myDate + 1, { name: 'TypeError' })

// Coerção explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2019')

// Implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)

;(async () => {
  const dates = await Promise.all([...myDate])

  assert.deepStrictEqual(dates, expectedDates)
})()