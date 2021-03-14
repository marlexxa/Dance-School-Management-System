import { User } from 'src/user/entities/user.entity';

export class CreatePaymentDto {
  userId: string;
  paymentMethod: string;
  deposit: number;
}
