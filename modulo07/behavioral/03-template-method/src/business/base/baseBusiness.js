import { NotImplementedException } from "../../util/exceptions.js";

export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name)
  }

  _create(data) {
    throw new NotImplementedException(this._create.name)
  }

  /* 
    Padrão do Martin Fowler: a proposta do padrão é garantir um fluxo de métodos, definindo uma sequência a ser executada.

    Esse create é a implementação efetiva do Template Method, que chama os métodos privados _validateRequiredFields e _create.
  */
  create(data) {
    // Validar campos e salvar no banco

    const isValid = this._validateRequiredFields(data)
    if (!isValid) throw new Error('Invalid data!')

    return this._create(data)
  }
}