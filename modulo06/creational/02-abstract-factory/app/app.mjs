export default class Application {
  constructor(factory) {
    this.table = factory.createTable()
  }

  inicialize(database) {
    this.table.render(database)
  }
}