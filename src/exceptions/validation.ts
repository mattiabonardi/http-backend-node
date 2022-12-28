import { ApplicationException } from "./application.js";

export class ValidationException extends ApplicationException {
    constructor(message: string) {
      super(400, message);
    }
  }
  