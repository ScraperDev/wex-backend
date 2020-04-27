import { HttpError } from '.';

export class InvalidTokenError extends HttpError {
  constructor() {
    super(403, 'Invalid or Incorrect Auth Token');
  }
}
