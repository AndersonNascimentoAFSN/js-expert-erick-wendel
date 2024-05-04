export default class Person {
  constructor({ id, vehicles, kmTraveled, from, to }) {
    this.id = id
    this.vehicles = vehicles
    this.kmTraveled = kmTraveled
    this.from = from
    this.to = to
  }

  formatted(currencies, language) {
    const { id, vehicles, kmTraveled, from, to } = this

    const mapDate = (date) => {
      const [year, month, day] = date.split('-').map(Number)

      // Datas no JS começam do 0, então é necessário subtrair 1 do mês
      return new Date(year, (month - 1), day)
    }

    const numberFormat = new Intl.NumberFormat(language, {
      style: 'unit',
      unit: 'kilometer'
    })
    const moneyFormat = new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currencies
    })
    const listFormat = new Intl.ListFormat(language, {
      style: 'long',
      type: 'conjunction'
    })
    const dateFormat = new Intl.DateTimeFormat(language, {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })

    return {
      id: Number(id),
      vehicles: listFormat.format(vehicles),
      kmTraveled: numberFormat.format(kmTraveled),
      from: dateFormat.format(mapDate(from)),
      to: dateFormat.format(mapDate(to)),
    }
  }

  static generateInstanceFromString(text) {
    const EMPTY_SPACE = ' '
    const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE)

    const person = new Person({
      id,
      kmTraveled,
      from,
      to,
      vehicles: vehicles.split(','), // Transforma a string em um array
    })

    return person
  }
}