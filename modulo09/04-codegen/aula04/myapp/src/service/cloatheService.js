
export default class  CloatheService {
  constructor({ repository: cloatheRepository }) {
    this.cloatheRepository = cloatheRepository
  }

  async create(data) {
    return await this.cloatheRepository.create(data);
  }

  async read() {
    return await this.cloatheRepository.read();
  }

  async update(id, data) {
    return await this.cloatheRepository.update(id, data);
  }

  async delete(id) {
    return await this.cloatheRepository.delete(id);
  }
}