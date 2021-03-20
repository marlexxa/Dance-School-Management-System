import { Document } from 'mongoose';
import { DepositInterface } from 'src/deposit/interfaces/deposit.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';

export interface PaymentInterface extends Document {
  user: UserInterface;
  paymentMethod: string;
  deposit: DepositInterface[];
}
