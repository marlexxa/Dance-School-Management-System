import { Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  surname: string;
  mail: string;
  password: string;
  gender: string;
}
