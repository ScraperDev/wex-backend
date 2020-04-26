import { hash } from 'bcrypt';
import { getRepository } from 'typeorm';
import { sign as signJwt } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Router, Request, Response, NextFunction } from 'express';

import { User } from '.';
import { Controller } from '../interfaces';
import { EmailTakenError } from '../errors';
import { CreateUserDto, LoginUserDto } from './dtos';

export class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private userRepo = getRepository(User);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {}

  private register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const userData: CreateUserDto = req.body;
      if (await this.userRepo.findOne({ email: userData.email })) {
        next(new EmailTakenError(userData.email));
      } else {
        const hashedPassword = await hash(userData.password, 10);
        const user = this.userRepo.create({
          ...userData,
          password: hashedPassword,
        });
        await this.userRepo.save(user);
        user.password = undefined;
        const token = this.createToken(user);
        res.send({ user, token });
      }
    }
  );

  private createToken(user: User): string {
    const expiresIn = 60 * 60 * 24; // One Day
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: TokenData = {
      id: user.id,
      name: user.name,
    };
    return signJwt(dataStoredInToken, secret, { expiresIn });
  }
}
