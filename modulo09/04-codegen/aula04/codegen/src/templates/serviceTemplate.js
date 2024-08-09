import Util from '../utils.js'

const componentNameAnchor = `$$componentName`
const repositoryNameAnchor = `$$repositoryName`

const template = `
export default class  ${componentNameAnchor}Service {
  constructor({ repository: ${repositoryNameAnchor}Repository }) {
    this.${repositoryNameAnchor}Repository = ${repositoryNameAnchor}Repository
  }

  async create(data) {
    return await this.${repositoryNameAnchor}Repository.create(data);
  }

  async read() {
    return await this.${repositoryNameAnchor}Repository.read();
  }

  async update(id, data) {
    return await this.${repositoryNameAnchor}Repository.update(id, data);
  }

  async delete(id) {
    return await this.${repositoryNameAnchor}Repository.delete(id);
  }
}`

export function serviceTemplate(componentName) {
  const txtTemplate = template
  .replace(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
  .replaceAll(repositoryNameAnchor, Util.lowerCaseFirstLetter(componentName))

  return {
    fileName: `${componentName}Service`,
    template: txtTemplate,
  }

}