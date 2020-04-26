import { HttpError } from '.';

export class WrongCredsError extends HttpError {
  constructor() {
    super(400, 'Incorrect Login Credentials Provided: Check your Email & Password');
  }
}
