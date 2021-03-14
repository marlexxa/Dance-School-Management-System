import { Document } from 'mongoose';
import { RoleType } from '../enum/role.enum';
import { UserInterface } from '../../user/interfaces/user.interface';

export interface RoleInterface extends Document {
  roleType: RoleType;
  user: UserInterface;
}
