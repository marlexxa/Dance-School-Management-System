import { Document } from 'mongoose';

export interface PaymentInterface extends Document {
  readonly id: string;
  readonly paymentMethod: string;
  readonly deposits: string;
}
