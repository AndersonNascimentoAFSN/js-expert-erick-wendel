import fsPromises from 'fs/promises'
// import fs from 'fs'

import templates from './templates/index.js'
import Util from './utils.js'

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}`],
    factory: [
      `${componentName}`,
      `${componentName}`,
    ]
  }

  return dependencies[layer]
    .map(Util.lowerCaseFirstLetter)
}

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(pendingFilesToWrite.map(({ fileName, txtFile }) =>
        fsPromises.writeFile(fileName, txtFile)))
}

export async function createFiles({
  mainPath,
  defaultMainFolder,
  componentName,
  layers,
}) {
  const keys = Object.keys(templates)
  const pendingFilesToWrite = []

  for (const layer of layers) {
    const chosenTemplate = keys.find(key => key.includes(layer))

    if (!chosenTemplate) {
      return { error: 'the chosen layer does not have a template' }
    }

    const template = templates[chosenTemplate]

    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}` // Exemplo /home/anderson/codegen/src/factory
    const dependencies = defaultDependencies(layer, componentName)

    const { fileName, template: txtFile } = template(componentName, ...dependencies)

    const file = `${targetFolder}/${Util.lowerCaseFirstLetter(fileName)}.js`

    pendingFilesToWrite.push({ fileName: file, txtFile })
  }

  try {
    await executeWrites(pendingFilesToWrite)

    return { success: true }

  } catch (error) {
    return { success: false }
  }

}