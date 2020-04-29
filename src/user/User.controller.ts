import { hash, compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import { sign as signJwt } from 'jsonwebtoken';
import * as asyncHandler from 'express-async-handler';
import { Router, Request, Response, NextFunction } from 'express';

import { User } from '.';
import { CreateUserDto, LoginUserDto } from './dto';
import { validationMiddleware, authMiddleware } from '../middleware';
import { Controller, TokenData, RequestWithUser } from '../interfaces';
import { EmailTakenError, WeakPasswordError, WrongCredsError } from '../errors';

export class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private userRepo = getRepository(User);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, authMiddleware, this.getUser);
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.register);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto), this.login);
  }

  private register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const userData: CreateUserDto = req.body;
      if (await this.userRepo.findOne({ email: userData.email })) {
        next(new EmailTakenError(userData.email));
      } else if (userData.password.length < 8) {
        next(new WeakPasswordError());
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

  private login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const loginData: LoginUserDto = req.body;
      const user = await this.userRepo.findOne({ email: loginData.email });
      if (user && (await compare(loginData.password, user.password))) {
        user.password = undefined;
        const token = this.createToken(user);
        res.send({ user, token });
      } else {
        next(new WrongCredsError());
      }
    }
  );

  private getUser = asyncHandler(
    async (req: RequestWithUser, res: Response, _next: NextFunction): Promise<void> => {
      const { password, ...user } = req.user;
      res.send(user);
    }
  );

  private createToken(user: User): string {
    const expiresIn = 60 * 60 * 24 * 7; // ~ One Week
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: TokenData = {
      id: user.id,
      name: user.name,
    };
    return 'Bearer ' + signJwt(dataStoredInToken, secret, { expiresIn });
  }
}
