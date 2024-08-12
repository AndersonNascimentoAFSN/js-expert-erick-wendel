import { Duplex, Transform } from 'stream'

let count = 0
const server = new Duplex({
  objectMode: true, // Modo de objeto, sem buffer, gasta mais memória
  encoding: 'utf-8',

  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`Hello World ${count}\n`)
        return
      }
      clearInterval(intervalContext)
      this.push(null)
    }

    setInterval(function () { everySecond(this) })
  },

  write(chunk, encoding, callback) {
    console.log(`[writable] saving`, chunk.toString())
    callback()
  }
})

// write aciona o writable do Duplex, e é um canal de comunicação diferente do read
server.write('[duplex] hey this is a writable!\n')
// server.on('data', msg => console.log(`[readable] received`, msg.toString()))

// O push deixar você enviar mais dados para o readable
server.push(`[duplex] hey this is a readable!\n`)

// server
//   .pipe(process.stdout)

const transformUpperCase = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    callback(null, chunk.toUpperCase())
  }
})

// Transform é também um duplex, mas não possuem comunicação independente.
transformUpperCase.write('[transform] hello from write!\n')
// O push vai ignorar o que você tem na função transform
transformUpperCase.push(`[transform] hello from push!\n`)

server
  .pipe(transformUpperCase)
  // redireciona todos os dados de readable para os dados da duplex
  .pipe(server)