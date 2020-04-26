import { Router as ExpressRouter } from 'express';

export interface Router {
  path: string;
  expressRouter: ExpressRouter;
}
