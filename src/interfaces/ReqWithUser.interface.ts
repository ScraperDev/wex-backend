import { Request } from 'express';
import { User } from '../user/User.entity';

export interface ReqWithUser extends Request {
  user: User;
}
