/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface PhoneInterface extends Document {
  readonly id?: string;
  readonly userId: string;
  readonly phoneNumber: string;
}
