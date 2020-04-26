import { Router } from 'express';
import { Controller } from '../interfaces';

export class UserController implements Controller {
  public path = '/user';
  public router = Router();
}
