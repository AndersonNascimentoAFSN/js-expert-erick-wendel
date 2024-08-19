import { createServer } from 'http'
import { BusinessError } from './errors/businessError.js'
import { statusCodes } from './util/httpStatusCodes.js'

function validateHero(hero) {
  // Simulando um outro erro, por exemplo de banco de dados
  if (Reflect.has(hero, 'connectionError')) {
    throw new Error('Error connecting to DB!')
  }

  if (hero.age < 20) {
    throw new BusinessError('Hero must be at least 20 years old')
  }

  if (hero.name?.length < 4) {
    throw new BusinessError('Hero name must have at least 4 characters')
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)
      validateHero(hero)
      response.writeHead(statusCodes.CREATED, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(hero))
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ message: error.message }))
        continue
      }
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' })
      // response.end(JSON.stringify({ message: error.message }))
    } finally {
      response.end()
    }
  }
}

createServer(handler).listen(3000, () => {
  console.log('Server is running on port 3000')
})

/* 
  curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}' -H 'Content-Type: application/json'
  curl localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}' -H 'Content-Type: application/json' | jq
*/