import { Request } from 'express';
import { User } from '../user/User.entity';

export interface RequestWithUser extends Request {
  user: User;
}
