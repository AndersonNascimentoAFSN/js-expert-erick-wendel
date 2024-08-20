import { createServer } from 'node:http'
import Events from 'node:events'
import { randomBytes } from 'crypto'

const myEvent = new Events()

function getBytes() {
  return randomBytes(10000)
}

function onData() {
  getBytes()
  const items = []
  setInterval(function myInterval() { items.push(Date.now()) })
}

function handler(request, response) {
  myEvent.on('data', onData)

  myEvent.emit('data', Date.now())

  response.end('ok')
}

const server = createServer(handler)

server.listen(3000, () => console.log('Server running on port 3000'))