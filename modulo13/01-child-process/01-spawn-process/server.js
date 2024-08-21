import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { pipeline } from 'node:stream/promises'
import { createWriteStream } from 'fs'

export class HttpServer {
  constructor() {
    this.server = createServer(async function handler(req, res) {
      const fileName = `file-${randomUUID()}.csv`

      await pipeline(
        req,
        createWriteStream(fileName)
      )

      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('upload with success!')
    })
  }

  start(port) {
    this.server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`)
    })
  }

  stop() {
    this.server.close(() => {
      console.log('Server stopped')
    })
  }
}

const server = new HttpServer()

server.start(3000)