import Util from '../utils'

const componentNameAnchor = `$$componentName`

const template = `
export default class ${componentNameAnchor}Repository {
  constructor() { }

  async create(data) {
    return Promise.reject(new Error('method not implemented!'));
  }

  async read(query) {
    return Promise.reject(new Error('method not implemented!'));
  }

  async update(id, data) {
    return Promise.reject(new Error('method not implemented!'));
  }

  async delete(id) {
    return Promise.reject(new Error('method not implemented!'));
  }
}`

export function repositoryTemplate(componentName) {
  const txtTemplate = template.replace(componentNameAnchor, Util.upperCaseFirstLetter(componentName))

  return {
    fileName: `${componentName}Repository`,
    template: txtTemplate,
  }
}