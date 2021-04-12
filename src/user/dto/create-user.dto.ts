import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  name: string;
  surname: string;
  mail: string;
  password: string;
  gender: Gender;
  role: Role[];
  comment: string;
  phoneNumber: string;
}
