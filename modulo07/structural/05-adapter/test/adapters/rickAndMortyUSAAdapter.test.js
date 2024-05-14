import { expect, describe, it, jest, beforeEach } from '@jest/globals'

import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'

describe.only('#RickAndMortyUSAAdapter', () => {
  describe('#getCharacters', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should be an adapter for RickAndMortyUSA.getCharactersFromXML', async () => {
      const brlIntegration = jest.spyOn(
        RickAndMortyUSA,
        RickAndMortyUSA.getCharactersFromXML.name
      ).mockResolvedValue([])

      const result = await RickAndMortyUSAAdapter.getCharacters()
      expect(result).toStrictEqual([])

      expect(brlIntegration).toHaveBeenCalledTimes(1)
      expect(brlIntegration).toHaveBeenCalled()
    })
  })
})