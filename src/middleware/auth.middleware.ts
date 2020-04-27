import { NextFunction, Response } from 'express';
import { verify as verifyJwt } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { NoTokenError, InvalidTokenError } from '../errors';
import { TokenData, RequestWithUser } from '../interfaces';
import { User } from '../user/User.entity';

export const authMiddleware = async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const headers = req.headers;
  const userRepository = getRepository(User);
  if (headers.authorization) {
    const secret = process.env.JWT_SECRET;
    const token = headers.authorization.substring(7);
    try {
      const verificationResponse = verifyJwt(token, secret) as TokenData;
      const id = verificationResponse.id;
      const user = await userRepository.findOne(id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new InvalidTokenError());
      }
    } catch (error) {
      next(new InvalidTokenError());
    }
  } else {
    next(new NoTokenError());
  }
};
