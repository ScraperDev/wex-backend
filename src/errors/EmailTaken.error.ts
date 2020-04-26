import { HttpError } from '.';

export class EmailTakenError extends HttpError {
  constructor(email: string) {
    super(400, `User With email: ${email} already exists`);
  }
}
