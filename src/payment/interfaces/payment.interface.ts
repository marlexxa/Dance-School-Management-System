import { Document } from 'mongoose';
import { DepositInterface } from 'src/deposit/interfaces/deposit.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { PaymentMethod } from '../enums/paymentMethod.enum';

export interface PaymentInterface extends Document {
  user: UserInterface;
  paymentMethod: PaymentMethod;
  deposit: DepositInterface[];
}
