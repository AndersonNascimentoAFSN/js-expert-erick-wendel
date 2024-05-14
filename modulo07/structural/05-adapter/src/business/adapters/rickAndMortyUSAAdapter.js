import RickAndMortyUSA from "../integrations/rickAndMortyUSA.js";

export default class RickAndMortUSAAdapter {
  static async getCharacters() {
    return RickAndMortyUSA.getCharactersFromXML()
  }
}