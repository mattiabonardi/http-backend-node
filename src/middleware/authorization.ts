import { AuthorizationTokenMissingException } from "../exceptions/authorization.js";
import { NextFunction, Response, Request } from "express";
import { verifyAccessToken } from "../managers/token.js";

export async function authorizationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let token = request.headers.authorization;
  token = token.replace("Bearer ", "");
  if (token) {
    try {
      const tokenData = verifyAccessToken(token);
      response.locals = {
        tokenData: tokenData,
      };
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(new AuthorizationTokenMissingException());
  }
}
