import { getRepository } from 'typeorm';
import * as asyncHandler from 'express-async-handler';
import { Router, Response, NextFunction } from 'express';

import { Listing } from '.';
import { CreateListingDto } from './dto';
import { RequestWithUser, Controller } from '../interfaces';
import { MinVolumeError, ListingNotFoundError } from '../errors';
import { authMiddleware, validationMiddleware } from '../middleware';
import { User } from '../user';

export class ListingController implements Controller {
  public path = '/listing';
  public router = Router();
  public listingRepo = getRepository(Listing);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware, this.getListings);
    this.router.get(`${this.path}/:listingId`, authMiddleware, this.getOneListing);
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      validationMiddleware(CreateListingDto),
      this.createListing
    );
  }

  private getListings = asyncHandler(
    async (req: RequestWithUser, res: Response, _next: NextFunction): Promise<void> => {
      const listings = await this.listingRepo.find({
        relations: ['owner'],
      });

      const response = listings.map((listing) => {
        if (req.user.id === listing.owner.id || listing.active) {
          const ownerId = listing.owner.id;
          listing.owner = undefined;
          return { ...listing, ownerId };
        }
      });

      res.send(response);
    }
  );

  private getOneListing = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
      try {
        const listing = await this.listingRepo.findOneOrFail(req.params.listingId, {
          relations: ['owner'],
        });
        if (!listing.active && req.user.id !== listing.owner.id) {
          next(new ListingNotFoundError());
          return;
        }
        const ownerId = listing.owner.id;
        listing.owner = undefined;
        res.send({ ...listing, ownerId });
      } catch {
        next(new ListingNotFoundError());
      }
    }
  );

  private createListing = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
      const listingData: CreateListingDto = req.body;
      if (!listingData.partialOk && listingData.volume !== listingData.minVolume) {
        next(new MinVolumeError());
      }
      const listing = this.listingRepo.create({ ...listingData, owner: req.user, active: true });
      const ownerId = listing.owner.id;
      listing.owner = undefined;
      res.send({ ...(await this.listingRepo.save(listing)), ownerId });
    }
  );
}
