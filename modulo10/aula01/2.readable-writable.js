import { Readable, Writable } from 'stream'

// Fonte de dados
const readable = new Readable({
  read() {
    this.push('Hello World 1')
    this.push('Hello World 2')
    this.push('Hello World 3')

    // Informa que os dados acabaram
    this.push(null)
  }
})

// Saída de dados

const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log('msg', chunk.toString())
    callback()
  }
})

readable
  // writable é sempre a saída -> imprimir, salvar ou ignorar
  .pipe(writable)
  // .pipe(process.stdout)

