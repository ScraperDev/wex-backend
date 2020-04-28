import { HttpError } from '.';

export class MinVolumeError extends HttpError {
  constructor() {
    super(400, "Minimum Volume Must Match Volume If Partial Purchase Ok Isn't Selected.");
  }
}
