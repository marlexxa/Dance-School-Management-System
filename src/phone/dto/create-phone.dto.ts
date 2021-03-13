/* eslint-disable prettier/prettier */
import { UserInterface } from '../../user/interfaces/user.interface';
export class CreatePhoneDto {
  user: UserInterface;
  phoneNumber: string;
}
