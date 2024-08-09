
export default class  PersonService {
  constructor({ repository: personRepository }) {
    this.personRepository = personRepository
  }

  async create(data) {
    return await this.personRepository.create(data);
  }

  async read() {
    return await this.personRepository.read();
  }

  async update(id, data) {
    return await this.personRepository.update(id, data);
  }

  async delete(id) {
    return await this.personRepository.delete(id);
  }
}