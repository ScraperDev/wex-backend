import { Router as ExpressRouter } from 'express';
import { Router } from '../interfaces';

export class UserRouter implements Router {
  public path = '/user';
  public expressRouter = ExpressRouter();
}
