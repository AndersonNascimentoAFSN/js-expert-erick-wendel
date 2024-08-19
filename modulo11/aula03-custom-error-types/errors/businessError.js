import { BaseError } from "./base/baseError.js";

export class BusinessError extends BaseError {
  constructor(ErrorMessage) {
    super({ name: 'BusinessError', message: ErrorMessage });
  }
}