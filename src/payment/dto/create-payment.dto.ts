import { DepositInterface } from 'src/deposit/interfaces/deposit.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';

export class CreatePaymentDto {
  user: UserInterface;
  paymentMethod: string;
  deposit: DepositInterface[];
}
