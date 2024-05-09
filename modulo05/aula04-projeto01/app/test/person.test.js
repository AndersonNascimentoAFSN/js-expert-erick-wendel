const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')
const mock = require('./mock/valid')
const Person = require('../src/person')

describe(('Person test suite'), () => {
  it('should generate a person instance from properties list', () => {
    const content = [
        'Júlia Menezes',
        'brasileira',
        'solteira',
        'CPF 297.947.800-81',
        'residente edomiciliada a Av. dos Estados',
        '99',
        'bairro Jardins',
        'São Paulo.'
    ]

    const result = new Person(content)

    const expected = {
      name: 'Júlia Menezes',
      nationality: 'Brasileira',
      civilState: 'Solteira',
      cpf: '29794780081',
      address: 'Av. dos Estados',
      number: '99',
      district: 'Jardins',
      city: 'São Paulo'
    }

    expect(result).to.be.deep.equal(expected)
  })
})