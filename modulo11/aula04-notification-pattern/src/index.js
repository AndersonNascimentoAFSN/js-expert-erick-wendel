import { createServer } from 'http'
// import { BusinessError } from './errors/businessError.js'
import { statusCodes } from './util/httpStatusCodes.js'
import HeroEntity from './heroEntity.js'

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data)

      // Simulando um outro erro, por exemplo de banco de dados
      if (Reflect.has(parsedData, 'connectionError')) {
        throw new Error('Error connecting to DB!')
      }

      const hero = new HeroEntity(parsedData)

      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' })

        response.end(JSON.stringify({ message: hero.notifications }))
        continue
      }

      // Cadastra no banco de dados...
      response.writeHead(statusCodes.CREATED, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(hero))
    } catch (error) {
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: error.message }))
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