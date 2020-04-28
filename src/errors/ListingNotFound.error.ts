import { HttpError } from '.';

export class ListingNotFoundError extends HttpError {
  constructor() {
    super(
      404,
      'Listing Not Found. This probably means the listing is either no longer active, or never existed.'
    );
  }
}
