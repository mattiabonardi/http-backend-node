import { NextFunction, Request, Response } from "express";

/**
 * Handle all application error
 * @param error
 * @param request
 * @param response
 */
export function errorMiddleware(
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  console.error(message);
  response.statusCode = status;
  response.json({
    message: message,
    status: status,
  });
}
