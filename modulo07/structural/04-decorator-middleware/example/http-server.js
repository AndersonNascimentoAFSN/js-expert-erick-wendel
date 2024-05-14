import http from 'http'
import { InjectHttpInterceptor } from './../index.js'

// curl -i localhost:3000
InjectHttpInterceptor()

function handleRequest(request, response) {
  response.end('hello world')
}

const server = http.createServer(handleRequest)
const port = 3000
server.listen(port, () => {
  console.log(`Server is listening on port ${server.address().port}`)
})