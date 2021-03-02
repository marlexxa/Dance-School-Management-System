import { Document } from 'mongoose';

export interface UserInterface extends Document {
  readonly id?: string;
  readonly name: string;
  readonly surname: string;
}
