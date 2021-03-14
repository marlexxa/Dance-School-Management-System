import { User } from 'src/user/entities/user.entity';

export class CreatePaymentDto {
  userId: User;
  paymentMethod: string;
  deposit: number;
}
