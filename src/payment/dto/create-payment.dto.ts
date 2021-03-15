import { UserInterface } from 'src/user/interfaces/user.interface';

export class CreatePaymentDto {
  user: UserInterface;
  paymentMethod: string;
  deposit: number;
}
