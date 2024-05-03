import { writeFile, readFile } from 'fs/promises'

export class PersonRepository {
  async save(person) {
    // nao tem __filename e __dirname no ES Modules
    const { pathname: databaseFile } = new URL('./../database.json', import.meta.url)
    const currentData = JSON.parse(await readFile(databaseFile))

    currentData.push(person)

    await writeFile(databaseFile, JSON.stringify(currentData))
  }
}