import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

export interface UserInterface extends Document {
  name: string;
  surname: string;
  mail: string;
  password: string;
  gender: string;
  role: Role[];
}
