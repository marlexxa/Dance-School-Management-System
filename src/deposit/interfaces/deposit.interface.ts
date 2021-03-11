import { Document } from 'mongoose';

export interface DepositInterface extends Document {
  id: number;
  idUser: number;
  amount: number;
  isPaid: boolean;
}
