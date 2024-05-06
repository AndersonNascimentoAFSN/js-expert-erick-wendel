const assert = require("assert")

const myMap = new Map()

// Podem ter qualquer coisa como chave

myMap
  .set(1, 'one')
  .set('Anderson', { text: 'person' })
  .set(true, () => 'Hello')

// Usando um construtor

const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

// console.log('myMap', myMap)
// console.log('myMapWithConstructor', myMapWithConstructor)

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Anderson'), { text: 'person' })
assert.deepStrictEqual(myMap.get(true)(), 'Hello')

// Em objects a chave só pode ser string ou symbol (number é coargido a string)

const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Anderson' })

// console.log('get', myMap.get({ id: 1 })) // undefined
// console.log('get', myMap.get(onlyReferenceWorks)) // { name: 'Anderson' }

assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Anderson' })

// Utilitários
// Para verificar o tamanho - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// Para verificar se um item existe no objeto - No Object seria {name: 'Anderson'}.hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// Para remover um item - No Object seria delete {name: 'Anderson'}.name
myMap.delete(onlyReferenceWorks)
assert.deepStrictEqual(myMap.has(onlyReferenceWorks), false)

// Não dá para iterar em Objects diretamente
// Tem que transformar em array com Object.entries ou Object.keys
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, 'one'], ['Anderson', { text: 'person' }], [true, () => 'Hello']]))

// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }

// Object é inseguro, pois dependendo do nome da chave, pode sobrescrever um método
// ({}).toString() => '[object Object]'
// ({ toString: 'custom' }).toString() => 'custom'

// Qualquer chave pode colidir com as propriedades herdadas do objeto

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}

// console.log('actor.toString', actor.toString)

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não dá para limpar um Obj sem reassiná-lo

myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// --- WeakMap

// Pode ser coletado após perder as referências
// Usado em casos específicos

// Tem a maioria dos benefícios do Map, porém Não é iterável
// Só chaves de referência e que você já conheça
// Mais leve e prever leak de memória, porque depois que as instancias são coletadas, o WeakMap também é coletado

const weakMap = new WeakMap()
const hero = {}
weakMap.set(hero, { name: 'Flash' })
// weakMap.set(hero, { name: 'Start' }) // não funciona

assert.deepStrictEqual(weakMap.get(hero), { name: 'Flash' })
assert.ok(weakMap.has(hero))

weakMap.delete(hero)

assert.equal(weakMap.has(hero), false)
assert.deepStrictEqual(weakMap.get(hero), undefined)
