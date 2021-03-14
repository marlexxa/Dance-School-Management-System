import { UserInterface } from '../../user/interfaces/user.interface';

export class CreateDepositDto {
  user: UserInterface;
  amount: number;
  isPaid: boolean;
}
