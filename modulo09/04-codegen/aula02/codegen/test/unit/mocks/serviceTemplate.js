export default `
export default class  ProductService {
  constructor({ repository: productRepository }) {
    this.productRepository = productRepository
  }

  async create(data) {
    return await this.productRepository.create(data);
  }

  async read() {
    return await this.productRepository.read();
  }

  async update(id, data) {
    return await this.productRepository.update(id, data);
  }

  async delete(id) {
    return await this.productRepository.delete(id);
  }
}`