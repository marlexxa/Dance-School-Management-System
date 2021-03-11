/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePhoneDto } from './create-phone.dto';

export class UpdatePhoneDto extends PartialType(CreatePhoneDto) {
  id?: string;
  userId: string;
  phoneNumber: string;
}
