import { Document } from 'mongoose';
import { UserInterface } from 'src/user/interfaces/user.interface';

export interface DepositInterface extends Document {
  user: UserInterface;
  amount: number;
  isPaid: boolean;
}
