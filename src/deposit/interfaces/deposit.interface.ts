import { Document } from 'mongoose';

export interface DepositInterface extends Document {
  id: number;
  userId: number;
  amount: number;
  isPaid: boolean;
}
