import Application from "../app/app.mjs";
import { database } from "../shared/data.mjs";

; (async function main() {
  const path = globalThis.window ? 'browser' : 'console'
  const { default: ViewFactory } = await import(`../platforms/${path}/index.mjs`)

  const app = new Application(new ViewFactory())

  const formattedDatabase = database.map((item) => {
    Reflect.deleteProperty(item, 'id')
    Reflect.deleteProperty(item, 'createdAt')
    Reflect.deleteProperty(item, 'updatedAt')

    return item
  })

  app.inicialize(formattedDatabase)
})()