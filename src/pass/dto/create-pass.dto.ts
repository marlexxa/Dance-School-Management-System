import { UserInterface } from '../../user/interfaces/user.interface';
import { PassType } from '../enums/passType.enum';

export class CreatePassDto {
  user: UserInterface;
  group: String;
  startDate: Date;
  endDate: Date;
  remainingNumber: number;
  price: number;
  type: PassType;
}
