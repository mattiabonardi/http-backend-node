import { ApplicationException } from "./application.js";

export class WrongAuthenticationTokenException extends ApplicationException {
  constructor() {
    super(401, "Wrong authentication token");
  }
}

export class AuthorizationTokenMissingException extends ApplicationException {
  constructor() {
    super(400, "Authorization token missing");
  }
}
