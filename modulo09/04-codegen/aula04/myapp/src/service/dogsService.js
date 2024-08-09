
export default class  DogsService {
  constructor({ repository: dogsRepository }) {
    this.dogsRepository = dogsRepository
  }

  async create(data) {
    return await this.dogsRepository.create(data);
  }

  async read() {
    return await this.dogsRepository.read();
  }

  async update(id, data) {
    return await this.dogsRepository.update(id, data);
  }

  async delete(id) {
    return await this.dogsRepository.delete(id);
  }
}