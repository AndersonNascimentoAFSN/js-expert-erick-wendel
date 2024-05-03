import { PersonRepository } from './personRepository.js';

export class PersonService {
  constructor() {
    this.personRepository = new PersonRepository()
  }

  addPerson(person) {
    this.personRepository.save(person);
  }
}