import { HttpError } from '.';

export class WeakPasswordError extends HttpError {
  constructor() {
    super(400, 'Password is too weak. It must be at least 8 characters long.');
  }
}
