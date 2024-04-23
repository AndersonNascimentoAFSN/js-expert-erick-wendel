class User {
  constructor({name, id, profession, age}) {
    this.name = name
    this.id = parseInt(id)
    this.profession = profession
    // this.birthDay = new Date().getFullYear() - age
    this.birthDay = Number(age)
  }
}

module.exports = User