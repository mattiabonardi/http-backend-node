import { ApplicationException } from "./application.js";

export class WrongCredentialException extends ApplicationException {
  constructor() {
    super(401, "Wrong authentication token");
  }
}
