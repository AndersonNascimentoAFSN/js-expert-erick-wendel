import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import axios from 'axios'

import Character from '../../src/entities/character'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'

describe('#RickAndMortyBRL', () => {
  describe('#getCharactersFromJSON', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return a list of characters entity', async () => {
      const response = JSON.parse(await fs.readFile('./test/mocks/characters.json'))
      const expected = response.results.map(char => new Character(char))

      // Mock Axios
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: response
      })

      const result = await RickAndMortyBRL.getCharactersFromJSON()

      expect(result).toStrictEqual(expected)
    })
    it('should return an empty list if the API returns nothing', async () => {
      const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json'))
      const expected = []

      // Mock Axios
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: response
      })

      const result = await RickAndMortyBRL.getCharactersFromJSON()

      expect(result).toStrictEqual(expected)
    })
  })
})

