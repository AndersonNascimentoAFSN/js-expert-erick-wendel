import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"

const postgresConnectionString = 'postgres://andersonnascimento:senha123@localhost:5432/heroes'
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = 'mongodb://andersonnascimento:senha123@localhost:27017/heroes'
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect()

const data = [
  { name: 'John', type: 'transaction' },
  { name: 'Doe', type: 'activityLog' },
]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext
}

// for(const { name, type } of data) {
//   const context = contextTypes[type]
//   await context.create({ name: name + Date.now()})
//   console.log(type, context.dbStrategy.constructor.name)
//   console.log(await context.read())
// } 

  // ; (async () => {
  //   // await postgresContext.create({name: data[0].name})
  //   // console.log(await postgresContext.read())

  //   // await mongoDBContext.create({ name: data[1].name })
  //   console.log(await mongoDBContext.read())

  //   // const resultMongo = await mongoDBStrategy.connect()
  //   // console.log('MongoDB connected', resultMongo)
  // })()