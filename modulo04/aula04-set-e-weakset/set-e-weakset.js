const assert = require('assert')

// usado na maioria das vezes para listas de itens únicos

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "1", "2"]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ["0", "1", "1", "2", "2", "2"])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

assert.deepStrictEqual(Array.from(set), ["0", "1", "2"])
assert.deepStrictEqual(Array.from(new Set(arr1.concat(arr2))), ["0", "1", "2"])
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ["0", "1", "2"])

// console.log('set.keys', set.keys())
// console.log('set.values', set.values())
// console.log('set.values', set.entries())

// No array comum, para verificar se contém um item, é necessário percorrer todo o array
// [1, 2, 3, 4, 5].includes(3) // O(n) em arrays
// [1, 2, 3, 4, 5].indexOf('1') !== -1 // O(n) em arrays
assert.ok(set.has('1'))

// Mesma teoria do Map, mas você sempre trabalha com a lista toda;
// Não tem get, então você pode saber se o item está ou não no array e é isso;
// Na documentação tem exemplos sobre como fazer uma interceção, diferença, etc.

const users01 = new Set([
  'Anderson',
  'Ana',
  'Gabriela'
])

const users02 = new Set([
  'Bruno',
  'Anderson',
  'Guilherme'
])

const intersection = new Set([...users01].filter(user => users02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['Anderson'])

const difference = new Set([...users01].filter(user => !users02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['Ana', 'Gabriela'])

Set.prototype.intersection = function(list) {
  return new Set([...this].filter(item => list.has(item)))
}
Set.prototype.difference = function(list) {
  return new Set([...this].filter(item => !list.has(item)))
}

assert.deepStrictEqual(Array.from(users01.intersection(users02)), ['Anderson']) 
assert.deepStrictEqual(Array.from(users01.difference(users02)), ['Ana', 'Gabriela']) 

// weakSet

// Mesma ideia do WeakMap
// Não é enumerável
// Só trabalha com chaves como referência
// Só possui métodos .add, .delete, .has

const user = { id: 123 }
const user2 = { id: 456 }

const weakSet = new WeakSet([user])

weakSet.add(user2)
assert.ok(weakSet.has(user2))

weakSet.delete(user2)
assert.equal(weakSet.has(user2), false)
