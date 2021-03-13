/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { UserInterface } from '../../user/interfaces/user.interface';
export interface PhoneInterface extends Document {
  id?: string;
  user: UserInterface;
  phoneNumber: string;
}
