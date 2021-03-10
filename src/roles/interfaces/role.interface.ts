import { Document } from 'mongoose';

export interface RoleInterface extends Document {
  readonly id?: string;
  readonly role: string;
  readonly userID: string;
}
