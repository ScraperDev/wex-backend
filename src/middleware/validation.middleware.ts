import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { BadRequestError } from '../errors/BadRequest.error';

// not worth figuuring out how the DTO is supposed to be typed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false
): express.RequestHandler {
  return (req, _res, next): void => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          next(new BadRequestError(errors));
        } else {
          next();
        }
      }
    );
  };
}
