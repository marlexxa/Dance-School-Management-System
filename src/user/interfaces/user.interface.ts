import { Document } from 'mongoose';
import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';

export interface UserInterface extends Document {
  name: string;
  surname: string;
  mail: string;
  password: string;
  gender: Gender;
  role: Role[];
}
