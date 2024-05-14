export default class Character {
  constructor({ id, name, status, type, gender, origin, location }) {
    // this.id = isNaN(id) ? id : Number(id)
    this.id = Number(id)
    this.name = name
    this.status = status
    this.type = type
    this.gender = gender
    this.origin = origin?.name
    this.location = location?.name
  }
}