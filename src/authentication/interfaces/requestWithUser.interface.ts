import { Request } from 'express';
import { UserInterface } from '../../user/interfaces/user.interface';

export interface RequestWithUser extends Request {
  user: UserInterface;
}
