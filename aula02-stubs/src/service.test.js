const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')

const BASE_URL_1 = 'https://viacep.com.br/ws/57052020/json/'
const BASE_URL_2 = 'https://viacep.com.br/ws/57073214/json/'

const mocks = {
  cep_1: require('../mocks/cep-1.json'),
  cep_2: require('../mocks/cep-2.json')
}

  ; (async () => {
    // {
    //   // vai para a internet!!
    //   const service = new Service()
    //   const withoutStub = await service.makeRequest(BASE_URL_1)
    //   console.log('withoutStub', JSON.stringify(withoutStub))
    // }

    const service = new Service()
    const stub = sinon.stub(service, 'makeRequest')

    stub.withArgs(BASE_URL_1).resolves(mocks.cep_1)
    stub.withArgs(BASE_URL_2).resolves(mocks.cep_2)
    {
      const expected = {
        street: 'Rua Antônio Guedes Nogueira',
        city: 'Maceió',
        uf: 'AL'
      }
      const withStub = await service.getCep(BASE_URL_1)
      deepStrictEqual(withStub, expected)
    }
    {
      const expected = {
        street: 'Rua 67',
        city: 'Maceió',
        uf: 'AL'
      }
      const withStub = await service.getCep(BASE_URL_2)
      deepStrictEqual(withStub, expected)
    }
  })()