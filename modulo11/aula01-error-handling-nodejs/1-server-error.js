import Http from 'http'

let count = 1

async function handler(request, response) {
  count ++
  try {
    if (count % 2 === 0) {
      await Promise.reject('Dentro do handler!')
    }

    for await (const data of request) {

      if (count % 2 !== 0) {
        await Promise.reject('Erro dentro do for!')
      }
      response.end()
    }
  } catch (error) {
    console.error(error)
    response.writeHead(500)
    response.write(JSON.stringify({ error: 'Internal Server Error' }))
    response.end()
  }
}

Http.createServer(handler)
  .listen(3000, () => console.log('server listening on port 3000'))