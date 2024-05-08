const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')
const mock = require('./mock/valid')

describe('TextProcessorFluentAPI test suite', () => {
  it('#build', () => {
    const result = new TextProcessorFluentAPI(mock).build()
    expect(result).to.be.deep.equal(mock)
  })
  it('#extractPeopleData', () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build()

    const expected = [
      'Júlia Menezes, 297.947.800-81, neste ato representada  por seu sócio-gerente Júlia Menezes, brasileira, solteira, residente e domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.',
      'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e domiciliada na Rua dos bobos, zero, bairro Alphaville, São Paulo.'
    ]

    expect(result).to.be.deep.equal(expected)
  })
})