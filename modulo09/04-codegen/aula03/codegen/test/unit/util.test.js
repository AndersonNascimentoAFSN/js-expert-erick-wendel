import {
  expect,
  describe,
  it,
  jest,
  beforeEach,
} from '@jest/globals'
import Util from '../../src/utils'


describe('#Util - Strings', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  describe('#upperCaseFirstLetter', () => {
    it('should upperCase first letter', () => {
      const data = 'hello'
      const expected = 'Hello'

      const result = Util.upperCaseFirstLetter(data)

      expect(result).toStrictEqual(expected)
    })

    it('should given an empty string it should return empty', () => {
      const data = ''
      const expected = ''

      const result = Util.upperCaseFirstLetter(data)

      expect(result).toStrictEqual(expected)
    })
  })
  describe('#lowerCaseFirstLetter', () => {
    it('should lowerCase first letter', () => {
      const data = 'Hello'
      const expected = 'hello'

      const result = Util.lowerCaseFirstLetter(data)

      expect(result).toStrictEqual(expected)
    })
    it('should given an empty string it should return empty', () => {
      const data = ''
      const expected = ''

      const result = Util.lowerCaseFirstLetter(data)

      expect(result).toStrictEqual(expected)
    })
  })
})