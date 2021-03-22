import { DepositInterface } from 'src/deposit/interfaces/deposit.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { PaymentMethod } from '../enums/paymentMethod.enum';

export class CreatePaymentDto {
  user: UserInterface;
  paymentMethod: PaymentMethod;
  deposit: DepositInterface[];
}
