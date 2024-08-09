
export default class  CarsService {
  constructor({ repository: carsRepository }) {
    this.carsRepository = carsRepository
  }

  async create(data) {
    return await this.carsRepository.create(data);
  }

  async read() {
    return await this.carsRepository.read();
  }

  async update(id, data) {
    return await this.carsRepository.update(id, data);
  }

  async delete(id) {
    return await this.carsRepository.delete(id);
  }
}