import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import { UserFactory } from '../src/factory/userFactory.js'


describe('User Factory', async () => {
  it('should return a list of users', async () => {
    const dbData = [{ name: 'Mariazinha' }, { name: 'Joãozinho' }]
    const MockDatabase = {
      connect: () => this,
      find: async (query) => dbData
    }

    sinon.stub(UserFactory, 'createInstance').returns(MockDatabase)

    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    expect(result).to.be.deep.equal(dbData)
  })
})
