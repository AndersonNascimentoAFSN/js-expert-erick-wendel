import database from './../database.json' assert { type: 'json' }
import Person from './person.js'
import TerminalController from './terminalController.js'

console.log('database', database)

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.inicializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const answer = await terminalController.question('what??\n')
    if (answer === STOP_TERM) {
      terminalController.terminal.close()
      console.log('Process finished!')
      return
    }
    const person = Person.generateInstanceFromString(answer)

    terminalController.updateTable(person.formatted('BRL', DEFAULT_LANGUAGE))
    
    terminalController.saveTable(person)

    // await save(person)

    return mainLoop()
  } catch (error) {
    console.error('DEU RUIM**', error)
    return mainLoop()
  }
}

await mainLoop()