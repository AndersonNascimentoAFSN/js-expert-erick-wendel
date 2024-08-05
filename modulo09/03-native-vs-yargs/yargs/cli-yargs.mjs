#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() })

const { argv } = yargs(hideBin(process.argv)).command(
  'createHero', 'create a hero', (builder) => {
    return builder
      .options('name', {
        alias: 'n',
        demandOption: true,
        type: 'string',
        describe: 'Hero name'
      })
      .options('age', {
        alias: 'a',
        demandOption: true,
        type: 'number',
        describe: 'Hero age'
      })
      .options('power', {
        alias: 'p',
        demandOption: true,
        type: 'string',
        describe: 'Hero power'
      })
      .example('createHero --name Flash --age 23 --power Speed', 'Create a hero')
      .example('createHero -n Flash -a 23 -p Speed', 'Create a hero')
  }
)
.epilog('copyright 2024 - Anderson Nascimento Corporation')

console.log(hero(argv))