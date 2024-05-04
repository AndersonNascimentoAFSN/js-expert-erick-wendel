import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'
import Person from './person.js'
import { PersonService } from './personService.js'

export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
    this.personService = new PersonService()
  }

  inicializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.#inicializeTable(database, language)
  }

  #inicializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted('BRL', language))
    const table = chalkTable(this.#getTableOptions(), data)
    this.print = console.draft(table)
    this.data = data
  }

  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.#getTableOptions(), this.data))
  }

  saveTable(person) {
    this.personService.addPerson(person)
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }

  closeTerminal() {
    this.terminal.close()
  }

  #getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.magenta('KM Traveled') },
        { field: 'from', name: chalk.magenta('From') },
        { field: 'to', name: chalk.magenta('To') }
      ]
    }
  }

}