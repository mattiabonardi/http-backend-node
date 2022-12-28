import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../exceptions/validation.js";
import { RequestHandler } from "express";

/**
 * Validate request body
 * @param type
 * @param skipMissingProperties
 * @returns
 */
export function validationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints))
            .join(", ");
          next(new ValidationException(message));
        } else {
          next();
        }
      }
    );
  };
}
