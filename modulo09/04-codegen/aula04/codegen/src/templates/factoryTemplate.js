import Util from '../utils.js'

const componentNameAnchor = `$$componentName`
const componentDepAnchor = `$$componentDepAnchor`

const template = `
import ${componentNameAnchor}Repository from '../repository/${componentDepAnchor}Repository.js'
import ${componentNameAnchor}Service from '../service/${componentDepAnchor}Service.js'

export default class ${componentNameAnchor}Factory {
    static getInstance() {
    const repository = new ${componentNameAnchor}Repository();
    const service = new ${componentNameAnchor}Service({ repository });
    return service
  }
}`


export function factoryTemplate(componentName) {
  const txtTemplate = template
    .replaceAll(componentDepAnchor, Util.lowerCaseFirstLetter(componentName))
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))

  return {
    fileName: `${componentName}Factory`,
    template: txtTemplate,
  }
}
