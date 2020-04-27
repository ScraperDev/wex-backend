import { HttpError } from '.';

export class NoTokenError extends HttpError {
  constructor() {
    super(401, 'Authentication Header Token Missing');
  }
}
