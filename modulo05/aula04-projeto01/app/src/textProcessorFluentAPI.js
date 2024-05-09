// O objetivo do Fluent API é executar tarefas, como um pipeline, step by step e no fim chama o build. Muito similar ao padrão Builder. A diferença que aqui é sobre processos, o Builder é sobre construção de objetos.

const { evaluateRegex } = require('./util/invalidRegexError')
const Person = require('./person')

class TextProcessorFluentAPI {
  // propriedade privada!
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    const matchPerson = evaluateRegex(/(?<=contratante:\s+|contratado:\s+).*\n.*/gim)
    // if (!this.#content) throw new Error('The content is empty') // Todo aplicar classe de erro
    this.#content = this.#content.match(matchPerson)

    return this
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    // if (!this.#content) throw new Error('The content property is empty')
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }

  removeEmptyCharacters() {
    const trimArray = evaluateRegex(/^\s+|\s+$|\n|\s{2}/g)
    this.#content = this.#content.map(lines => lines.map(item => item.replace(trimArray, '')))
    return this
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line))
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI