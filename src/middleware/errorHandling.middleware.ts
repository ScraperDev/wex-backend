import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors';

export const errorHandling = (
  error: HttpError,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    message,
    status,
  });
};
