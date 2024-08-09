export default `
export default class ProductRepository {
  constructor() { }

  async create(data) {
    return Promise.reject(new Error('method not implemented!'));
  }

  async read(query) {
    return Promise.reject(new Error('method not implemented!'));
  }

  async delete(id, data) {
    return Promise.reject(new Error('method not implemented!'));
  }

  async delete(id) {
    return Promise.reject(new Error('method not implemented!'));
  }
}`