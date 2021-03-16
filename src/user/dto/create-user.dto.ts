import { Role } from '../enums/role.enum';

export class CreateUserDto {
  name: string;
  surname: string;
  mail: string;
  password: string;
  gender: string;
  role: Role[];
}
