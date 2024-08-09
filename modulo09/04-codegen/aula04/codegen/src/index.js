#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { createLayersIfNotExists } from './createLayers.js'
import { createFiles } from './createFiles.js'

const { argv: { componentName } } = yargs(hideBin(process.argv))
  .command('skeleton', 'Generate a skeleton for a new project', (builder) => {
    return builder
      .options('component-name', {
        alias: 'c',
        demandOption: true,
        describe: 'Component`s name',
        type: 'array',
      })
      .example('skeleton --component-name product --component-repository-name product --component-service-name product', 'Generate a project with a single domain')
      .example('skeleton -c product', 'Generate a project with a a single domain with short flags')
      .example('skeleton -c product -c user -c person', 'Generate a project with a list of domain')
  }).epilog('Copyright 2024 - Anderson Nascimento')

const env = process.env.NODE_ENV

const defaultFolder = env === 'dev' ? "tmp" : 'src'
console.log('defaultFolder', defaultFolder) 
const layers = ['repository', 'service', 'factory'].sort()

const config = {
  layers: layers,
  defaultMainFolder: defaultFolder,
  mainPath: '.',
}

// console.log('componentName', componentName)
// console.log('componentName', argv)

await createLayersIfNotExists(config)

const pendingPromises = []
for (const domain of componentName) {
  const result = createFiles({
    ...config,
    componentName: domain,
  })

  pendingPromises.push(result)
}

// await Promise.all(pendingPromises)

