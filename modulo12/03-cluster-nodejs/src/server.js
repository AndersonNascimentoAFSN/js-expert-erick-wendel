import { createServer } from 'node:http'
import { appendFile } from 'fs/promises'

export class Server {
  static async handler(request, response) {
    await appendFile('./logs/log.txt', `processed by: ${process.pid}\n`)

    const result = Array
      .from({ length: 1e3 }, _ => Math.floor(Math.random() * 40))
      .reduce((acc, curr) => acc + curr, 0)

    response.end(result.toString())
  }

  static initialize() {
    createServer(this.handler)
      .listen(3000, () => {
        console.log(`Server is running on http://localhost:3000 and pid ${process.pid}`)
      })

    setTimeout(() => { process.exit(1) }, Math.random() * 1e4)
  }
}

// Server.initialize()

// async function handler(request, response) {
//   await appendFile('./logs/log.txt', `processed by: ${process.pid}\n`)

//   const result = Array
//     .from({ length: 1e3 }, _ => Math.floor(Math.random() * 40))
//     .reduce((acc, curr) => acc + curr, 0)

//   response.end(result.toString())
// }

// const server = createServer(handler)

// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000 and pid ${process.pid}`)
// })