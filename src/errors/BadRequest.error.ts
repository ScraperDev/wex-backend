import { HttpError } from '.';
import { ValidationError } from 'class-validator';

export class BadRequestError extends HttpError {
  constructor(errors: ValidationError[]) {
    const message = errors
      .map((error: ValidationError) => Object.values(error.constraints))
      .join(', ');
    super(400, message);
  }
}
