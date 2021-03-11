import { Document } from 'mongoose';

export interface RoleInterface extends Document {
  role: string;
  userID: string;
}
