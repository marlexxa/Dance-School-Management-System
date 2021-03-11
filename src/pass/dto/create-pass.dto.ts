import { UserInterface } from '../../user/interfaces/user.interface';

export class CreatePassDto {
  user: UserInterface;
  //group: String;
  startDate: Date;
  endDate: Date;
  remainingNumber: number;
  price: number;
}
