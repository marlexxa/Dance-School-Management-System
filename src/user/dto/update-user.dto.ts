import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: string;
  name: string;
  surname: string;
  mail: string;
  password: string;
  gender: string;
}
