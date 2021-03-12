/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePhoneDto } from './create-phone.dto';
import { UserInterface } from '../../user/interfaces/user.interface';

export class UpdatePhoneDto extends PartialType(CreatePhoneDto) {
  id?: string;
  user: UserInterface;
  phoneNumber: string;
}
