'use strict'

const assert = require('assert')

// Garantir semântica e segurança em objetos

// -- apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}
assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Vixxx') }
// assert.throws(() => myObj.add.apply({}, []),
//   {
//     name: 'TypeError',
//     message: 'Vixxx'
//   }
// )

// Esse aqui pode acontecer!
// myObj.add.apply = function () { throw new TypeError('Vixxx') }
// assert.throws(() => myObj.add.apply({}, []),
//   {
//     name: 'TypeError',
//     message: 'Vixxx'
//   }
// )

// Usando reflect: 

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [100])
assert.deepStrictEqual(result, 160)
// -- apply

// -- defineProperty

// Questões semânticas

function MyDate() {}

// Feio
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })

// Bonito
Reflect.defineProperty(MyDate, 'withReflect', { value: () => 'Hey you' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflect(), 'Hey you')

// --- deleteProperty

const withDelete =  {user: 'AndersonNascimento'}
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection =  {user: 'XuxaDaSilva'}

Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// --- get

// Deveríamos fazer um get somente em instâncias de referência

assert.deepStrictEqual(1['userName'], undefined)

// Com reflection, uma exceção é lançada
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// ---- has
const superHero = { superman: 'Clark Kent' }
assert.ok('superman' in superHero)
assert.ok(Reflect.has(superHero, 'superman'))

// --- ownKeys
const userName = Symbol('userName')

const myObjUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [userName]: 'AndersonNascimento'
}

// Com os métodos tradicionais, não conseguimos acessar userName

const objectKeys = [
  ...Object.getOwnPropertyNames(myObjUser),
  ...Object.getOwnPropertySymbols(myObjUser)
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), userName])

// Com reflection, conseguimos acessar userName com um simples Reflect.ownKeys
assert.deepStrictEqual(Reflect.ownKeys(myObjUser), [ 'id', Symbol.for('password'), userName ])