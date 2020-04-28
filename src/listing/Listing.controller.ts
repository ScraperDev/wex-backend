import { getRepository } from 'typeorm';
import * as asyncHandler from 'express-async-handler';
import { Router, Response, NextFunction } from 'express';

import { Listing } from '.';
import { authMiddleware } from '../middleware';
import { RequestWithUser, Controller } from '../interfaces';

export class ListingController implements Controller {
  public path = '/listing';
  public router = Router();
  public listingRepo = getRepository(Listing);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware, this.getActiveListings);
  }

  private getActiveListings = asyncHandler(
    async (_req: RequestWithUser, res: Response, _next: NextFunction): Promise<void> => {
      res.send(await this.listingRepo.find({ where: { active: true } }));
    }
  );
}
