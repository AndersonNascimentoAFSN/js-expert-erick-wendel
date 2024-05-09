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
      'Júlia   Menezes,   brasileira,   solteira,   CPF   297.947.800-81,   residente   e\n' +
      'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.',
      'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e domiciliada\n' +
      'a Rua dos bobos, zero, bairro Alphaville, São Paulo.'
    ]

    expect(result).to.be.deep.equal(expected)
  })
  it('#divideTextInColumns', () => {
    const content = [
      'Júlia   Menezes,   brasileira,   solteira,   CPF   297.947.800-81,   residente   e\n' +
        'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.',
      'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e domiciliada\n' +
        'a Rua dos bobos, zero, bairro Alphaville, São Paulo.'
    ]

    const result = new TextProcessorFluentAPI(content).divideTextInColumns().build()

    const expected = [
      [
        'Júlia   Menezes',
        '   brasileira',
        '   solteira',
        '   CPF   297.947.800-81',
        '   residente   e\ndomiciliada a Av. dos Estados',
        ' 99',
        ' bairro Jardins',
        ' São Paulo.'
      ],
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e domiciliada\na Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo.'
      ]
    ]

    expect(result).to.be.deep.equal(expected)
  })
  it('#removeEmptyCharacters', () => {
    const content = [
      [
        'Júlia   Menezes',
        '   brasileira',
        '   solteira',
        '   CPF   297.947.800-81',
        '   residente   e\ndomiciliada a Av. dos Estados',
        ' 99',
        ' bairro Jardins',
        ' São Paulo.'
      ]
    ]

    const result = new TextProcessorFluentAPI(content).removeEmptyCharacters().build()

    const expected = [
      [
        'Júlia Menezes',
        'brasileira',
        'solteira',
        'CPF 297.947.800-81',
        'residente edomiciliada a Av. dos Estados',
        '99',
        'bairro Jardins',
        'São Paulo.'
      ]
    ]

    expect(result).to.be.deep.equal(expected)
  })
  it('#mapPerson', () => {
    const content = [
      [
        'Júlia Menezes',
        'brasileira',
        'solteira',
        'CPF 297.947.800-81',
        'residente edomiciliada a Av. dos Estados',
        '99',
        'bairro Jardins',
        'São Paulo.'
      ]
    ]

    const result = new TextProcessorFluentAPI(content).mapPerson().build()

    const expected = [
      {
        name: 'Júlia Menezes',
        nationality: 'Brasileira',
        civilState: 'Solteira',
        cpf: '29794780081',
        address: 'Av. dos Estados',
        number: '99',
        district: 'Jardins',
        city: 'São Paulo'
      }
    ]

    expect(result).to.be.deep.equal(expected)
  })
})