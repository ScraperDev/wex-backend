import { Router } from 'express';
import { Controller } from '../interfaces';
import { getRepository } from 'typeorm';

export class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private userRepo = getRepository(User);
}
