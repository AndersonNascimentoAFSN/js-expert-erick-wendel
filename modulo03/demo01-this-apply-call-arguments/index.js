'use strict'

const { watch, promises: { readFile } } = require('fs')

// watch(__filename, async (event, filename) => {
//   // console.log('index.js!', event, filename)
//   console.log((await readFile(filename)).toString())
// })

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', arguments)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()
// Dessa forma, ele ignora o 'this' da classe File, herda o this do watch!
// watch(__filename, file.watch)

// Alternativa para não herdar o this da função, mas fica feio!
// watch(__filename, (event, filename) => file.watch(event, filename))

// Podemos deixar explícito o this da classe File, usando o bind. O bind retornar uma função com o 'this que se mantém no file, ignorando o watch.
// watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('Call: Hey!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('Call: Hey!') }, [null, __filename])
