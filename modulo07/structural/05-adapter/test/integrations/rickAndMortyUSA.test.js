import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import axios from 'axios'

import Character from '../../src/entities/character'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'

describe.only('#RickAndMortyUSA', () => {
  describe('#getCharactersFromXML', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return a list of characters entity', async () => {
      const response = await fs.readFile('./test/mocks/characters.xml')
      const expected = [{"gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "status": "Dead", "type": "Superhuman (Ghost trains summoner)"}]

      // Mock Axios
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: response
      })

      const result = await RickAndMortyUSA.getCharactersFromXML()

      expect(result).toMatchObject(expected)
    })
    it('should return an empty list if the API returns nothing', async () => {
      const response = await fs.readFile('./test/mocks/characters-empty.xml')
      const expected = []

      // Mock Axios
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: response
      })

      const result = await RickAndMortyUSA.getCharactersFromXML()

      expect(result).toStrictEqual(expected)
    })
  })
})

