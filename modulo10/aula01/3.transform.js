import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'

// Fonte de dados
const readable = new Readable({
  read() {
    console.time('myTimer');
    for (let index = 0; index < 1e4; index++) {
      const person = { id: Date.now() + index, name: `User-${index}` }
      const data = JSON.stringify(person)
      this.push(data)
    }

    // Informa que os dados acabaram
    this.push(null)
    console.timeEnd('myTimer')
  }
})

// Processamento dos dados

const mapFields = new Transform({
  transform(chunk, encoding, callback) {
    const person = JSON.parse(chunk.toString())

    const { id, name } = person

    const data = `${id},${name}\n`

    callback(null, data)
  }
})

const mapHeaders = new Transform({
  transform(chunk, encoding, callback) {
    this.counter = this.counter ?? 0

    if (this.counter) {
      return callback(null, chunk)
    }

    this.counter += 1

    callback(null, "id,name\n".concat(chunk))
  }
})

// Saída de dados

const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    // console.log('msg', chunk.toString())
    callback()
  }
})

const pipeline = readable
  // writable é sempre a saída -> imprimir, salvar ou ignorar
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(writable)
  // .pipe(process.stdout)
  .pipe(createWriteStream('my.csv'))

pipeline.on('finish', () => {
  console.log('Pipeline finalizado')
})