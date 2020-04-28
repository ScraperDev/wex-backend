import { getRepository } from 'typeorm';
import * as asyncHandler from 'express-async-handler';
import { Router, Response, NextFunction } from 'express';

import { Listing } from '.';
import { CreateListingDto } from './dto';
import { RequestWithUser, Controller } from '../interfaces';
import { authMiddleware, validationMiddleware } from '../middleware';
import { MinVolumeError } from '../errors';

export class ListingController implements Controller {
  public path = '/listing';
  public router = Router();
  public listingRepo = getRepository(Listing);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware, this.getActiveListings);
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      validationMiddleware(CreateListingDto),
      this.createListing
    );
  }

  private getActiveListings = asyncHandler(
    async (_req: RequestWithUser, res: Response, _next: NextFunction): Promise<void> => {
      res.send(await this.listingRepo.find({ where: { active: true } }));
    }
  );

  private createListing = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
      const listingData: CreateListingDto = req.body;
      if (!listingData.partialOk && listingData.volume !== listingData.minVolume) {
        next(new MinVolumeError());
      }
      const listing = this.listingRepo.create({ ...listingData, owner: req.user, active: true });
      listing.owner.password = undefined;
      res.send(await this.listingRepo.save(listing));
    }
  );
}
