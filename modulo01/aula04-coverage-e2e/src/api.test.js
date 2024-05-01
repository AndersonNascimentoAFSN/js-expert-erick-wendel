const { describe, it, afterEach, beforeEach } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')
const sinon = require('sinon')
const { User } = require('./database/users')
const fs = require('fs')

const usersMock = [
  {
    "id": 1,
    "username": "JohnDoe",
    "password": "123456"
  },
  {
    "id": 2,
    "username": "AndersonNascimento",
    "password": "123456"
  }
]

describe('API Suite test', () => {
  // describe('/contact', () => {
  //   it('should request the contact page and return HTTP Status 200', async () => {
  //     const response = await request(app)
  //       .get('/contact')
  //       .expect(200)

  //     assert.deepStrictEqual(response.text, 'contact us page')
  //   })
  // })

  // describe('/hello', () => {
  //   it('should request an inexistent route /hi and redirect to default route and return HTTP Status 200', async () => {
  //     const response = await request(app)
  //       .get('/hi')
  //       .expect(200)

  //     assert.deepStrictEqual(response.text, 'Hello World!')
  //   })
  // })
  describe('/login with mock User module', () => {
    let UserModule

    beforeEach(() => {
      UserModule = sinon.stub(User, 'getUserByUsername')
    })

    afterEach(() => {
      UserModule.restore()
    })


    it('should login successfully on the login route and return HTTP Status 200', async () => {
      UserModule.withArgs('AndersonNascimento').resolves(usersMock[1])

      const response = await request(app)
        .post('/login')
        .send({ username: 'AndersonNascimento', password: '123456' })
        .expect(200)

      assert.deepStrictEqual(response.text, 'Logging has succeeded!')
    })
    it('should login failure when user is not exists and return HTTP Status 404', async () => {
      UserModule.withArgs('XuxaDaSilva').resolves(undefined)

      const response = await request(app)
        .post('/login')
        .send({ username: 'XuxaDaSilva', password: '123456' })
        .expect(404)

      assert.deepStrictEqual(response.text, 'User not found!')
    })
    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      UserModule.withArgs('JohnDoe').resolves(usersMock[0])

      const response = await request(app)
        .post('/login')
        .send({ username: 'JohnDoe', password: '12345' })
        .expect(401)

      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Logging has failed!')
    })
  })

  // Lento por conta que é feito uma Promise que espera 1s no module User

  // describe('/login with mock fs module', () => {

  //   // Mock module fs
  //   // const users = sinon.stub(fs, 'readFileSync')
  //   // users.returns(JSON.stringify(usersMock))

  //   // Mock module User
  //   // const stub = sinon.stub(User, 'getUserByUsername')
  //   // stub.withArgs('AndersonNascimento').resolves(usersMock[1])

  //   let fsModule

  //   beforeEach(() => {
  //     fsModule = sinon.stub(fs, 'readFileSync')
  //   })

  //   afterEach(() => {
  //     fsModule.restore()
  //   })


  //   it('should login successfully on the login route and return HTTP Status 200', async () => {
  //     fsModule.returns(JSON.stringify(usersMock))

  //     const response = await request(app)
  //       .post('/login')
  //       .send({ username: 'AndersonNascimento', password: '123456' })
  //       .expect(200)

  //     assert.deepStrictEqual(response.text, 'Logging has succeeded!')
  //   })
  //   it('should login failure when user is not exists and return HTTP Status 404', async () => {
  //     fsModule.returns(JSON.stringify(usersMock))

  //     const response = await request(app)
  //       .post('/login')
  //       .send({ username: 'XuxaDaSilva', password: '123456' })
  //       .expect(404)

  //     assert.deepStrictEqual(response.text, 'User not found!')
  //   })
  //   it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
  //     fsModule.returns(JSON.stringify(usersMock))

  //     const response = await request(app)
  //       .post('/login')
  //       .send({ username: 'JohnDoe', password: '12345' })
  //       .expect(401)

  //     assert.ok(response.unauthorized)
  //     assert.deepStrictEqual(response.text, 'Logging has failed!')
  //   })
  // })
})