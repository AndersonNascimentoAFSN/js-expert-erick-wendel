// O objetivo do Fluent API é executar tarefas, como um pipeline, step by step e no fim chama o build. Muito similar ao padrão Builder. A diferença que aqui é sobre processos, o Builder é sobre construção de objetos.

class TextProcessorFluentAPI {
  // propriedade privada!
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    const matchPerson1 = /\b(?:CONTRATANTE)\b:\s+(\S.*)/gmi
    const matchPerson2 = /\b(?:CONTRATADO)\b:\s+(\S.*)/gmi

    const onlyPerson1 = matchPerson1.exec(this.#content)[1]
    const onlyPerson2 = matchPerson2.exec(this.#content)[1]

    this.#content = [onlyPerson1, onlyPerson2]

    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI