import { Request, Response } from "express";
import { ApplicationException } from "../exceptions/application.js";

/**
 * Handle all application error
 * @param error
 * @param request
 * @param response
 */
export function errorMiddleware(
  error: ApplicationException,
  _request: Request,
  response: Response
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.statusCode = status;
  response.json({
    message: message,
    status: status,
  });
}
