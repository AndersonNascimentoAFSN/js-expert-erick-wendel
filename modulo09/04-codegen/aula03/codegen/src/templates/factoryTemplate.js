import Util from '../utils'

const componentNameAnchor = `$$componentName`
const repositoryNameAnchor = `$$repositoryName`
const serviceNameAnchor = `$$serviceName`

const repositoryNameDepAnchor = `$$depRepository`
const serviceNameDepAnchor = `$$depService`

const template = `
import ${repositoryNameAnchor}Repository from '../repository/${repositoryNameDepAnchor}Repository.js'
import ${serviceNameAnchor}Service from '../service/${serviceNameDepAnchor}Service.js'

export default class ${componentNameAnchor}Factory {
    static getInstance() {
    const repository = new ${repositoryNameAnchor}Repository();
    const service = new ${serviceNameAnchor}Service(repository);
    return service
  }
}`


export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtTemplate = template
    .replace(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(repositoryNameDepAnchor, Util.lowerCaseFirstLetter(repositoryName))
    .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))

  return {
    fileName: `${componentName}Factory`,
    template: txtTemplate,
  }
}
