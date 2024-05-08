// O objetivo do Fluent API é executar tarefas, como um pipeline, step by step e no fim chama o build. Muito similar ao padrão Builder. A diferença que aqui é sobre processos, o Builder é sobre construção de objetos.

const { evaluateRegex } = require('./util/invalidRegexError')

class TextProcessorFluentAPI {
  // propriedade privada!
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    const matchPerson1 = evaluateRegex(/\b(?:CONTRATANTE)\b:\s+(\S.*)/gmi)
    const matchPerson2 = evaluateRegex(/\b(?:CONTRATADO)\b:\s+(\S.*)/gmi)

    const onlyPerson1 = matchPerson1.exec(this.#content)[1]
    const onlyPerson2 = matchPerson2.exec(this.#content)[1]

    this.#content = [onlyPerson1, onlyPerson2]

    return this
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }

  removeEmptyCharacters() {
    const trimArray = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(lines => lines.map(item => item.replace(trimArray, '')))
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI