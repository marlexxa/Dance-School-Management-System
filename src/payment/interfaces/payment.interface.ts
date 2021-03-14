import { Document } from 'mongoose';

export interface PaymentInterface extends Document {
  userId: string;
  paymentMethod: string;
  deposits: string;
}
