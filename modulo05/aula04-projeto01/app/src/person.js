const { evaluateRegex } = require("./util/invalidRegexError")

class Person {
  // (\w+):\s.* -> replace -> $1,
  constructor([
    name,
    nationality,
    civilState,
    cpf,
    address,
    number,
    district,
    city,
  ]) {
    // (\w+): -> replace -> this.$1 = $1,
    const firstLetterExp = evaluateRegex(/^(\w)([a-zA-Z]+$)/)
    const cpfExp = evaluateRegex(/\D/g)
    const cityExp = evaluateRegex(/\.$/)
    const districtExp = evaluateRegex(/^\w+\s+/)

    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetterExp, (_fullMatch, group1, group2, _index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      })
    }

    const formatCpf = (prop) => {
      return prop.replace(cpfExp, '')
    }

    const formatCity = (prop) => {
      return prop.replace(cityExp, '')
    }

    const formatDistrict = (prop) => {
      return prop.replace(districtExp, '')
    }

    this.name = name
    this.nationality = formatFirstLetter(nationality)
    this.civilState = formatFirstLetter(civilState)
    this.cpf = formatCpf(cpf)
    this.address = address.match(/(?<=\sa\s).*$/, '').join()
    this.number = number
    this.district = formatDistrict(district)
    this.city = formatCity(city)
  }
}

module.exports = Person