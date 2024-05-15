// import FluentSQLBuilder from "../01-my-first-npm-module/index.js"
import FluentSQLBuilder from "@andersonnascimentoafsn/fluentsql"

import database from './database/data.json' assert { type: 'json' }

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(['category'])
  .limit(3)
  .countBy('category') // adicionado na versão 2.0
  // .groupCount('category') // break change na versão 2.0
  .build()

console.log('result', result)