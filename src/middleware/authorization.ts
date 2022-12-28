import { AuthorizationTokenMissingException } from "../exceptions/authorization.js";
import { NextFunction, Response, Request } from "express";
import { verifyAccessToken } from "../managers/token.js";

export async function authorizationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization;
  if (token) {
    try {
      const tokenData = verifyAccessToken(token);
      response.locals = {
        tokenData: tokenData,
      };
    } catch (error) {
      next(error);
    }
  } else {
    next(new AuthorizationTokenMissingException());
  }
}
