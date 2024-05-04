import { describe, it } from 'mocha'
import { expect } from 'chai'

import Person from '../src/person.js'

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString('1 bike,car 2000 2000-01-01 2000-12-31')
    const expected = {
      id: "1",
      vehicles: ['bike', 'car'],
      from: '2000-01-01',
      to: '2000-12-31',
      kmTraveled: '2000',
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values in pt-BR', () => {
    const person = new Person({
      id: "1",
      vehicles: ['bike', 'car'],
      from: '2000-01-01',
      to: '2000-12-31',
      kmTraveled: '2000',
    })

    const result = person.formatted('BRL', 'pt-BR')

    const expected = {
      id: 1,
      vehicles: 'bike e car',
      kmTraveled: '2.000 km',
      from: '01/01/2000',
      to: '31/12/2000',
    }

    expect(result).to.be.deep.equal(expected)
  })
})