import { expect, describe, it, jest, beforeEach } from '@jest/globals'

import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'

describe('#RickAndMortyBRLAdapter', () => {
  describe('#getCharacters', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should be an adapter for RickAndMortyBRL.getCharactersFromJSON', async () => {
      const brlIntegration = jest.spyOn(
        RickAndMortyBRL,
        RickAndMortyBRL.getCharactersFromJSON.name
      ).mockResolvedValue([])

      const result = await RickAndMortyBRLAdapter.getCharacters()
      expect(result).toStrictEqual([])

      expect(brlIntegration).toHaveBeenCalledTimes(1)
      expect(brlIntegration).toHaveBeenCalled()
    })
  })
})