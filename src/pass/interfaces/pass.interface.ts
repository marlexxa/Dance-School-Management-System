import { Document } from 'mongoose';
import { UserInterface } from '../../user/interfaces/user.interface';

export interface PassInterface extends Document {
  user: String;
  // group: String;
  startDate: Date;
  endDate: Date;
  remainingNumber: number;
  price: number;
}
