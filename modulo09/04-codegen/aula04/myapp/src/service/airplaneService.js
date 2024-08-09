
export default class  AirplaneService {
  constructor({ repository: airplaneRepository }) {
    this.airplaneRepository = airplaneRepository
  }

  async create(data) {
    return await this.airplaneRepository.create(data);
  }

  async read() {
    return await this.airplaneRepository.read();
  }

  async update(id, data) {
    return await this.airplaneRepository.update(id, data);
  }

  async delete(id) {
    return await this.airplaneRepository.delete(id);
  }
}