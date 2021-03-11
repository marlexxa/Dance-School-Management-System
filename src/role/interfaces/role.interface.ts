import { Document } from 'mongoose';
import { RoleType } from '../enum/role.enum';

export interface RoleInterface extends Document {
  roleType: RoleType;
  userID: string;
}
