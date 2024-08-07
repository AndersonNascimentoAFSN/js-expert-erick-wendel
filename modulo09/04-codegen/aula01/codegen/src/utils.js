export default class Util {

  static #transform({ str: [firstLetter, ...rest], upperCase = true }) {
    return [
      upperCase
        ? firstLetter.toUpperCase()
        : firstLetter.toLowerCase(),
      ...rest
    ]
      .join('')
  }

  static upperCaseFirstLetter(string) {
    if (!string) return ''

    return Util.#transform({ str: string })
  }

  static lowerCaseFirstLetter(string) {
    if (!string) return ''

    return Util.#transform({ str: string, upperCase: false })
  }
}