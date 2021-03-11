/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface PhoneInterface extends Document {
  id?: string;
  userId: string;
  phoneNumber: string;
}
