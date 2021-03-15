import { Document } from 'mongoose';
import { UserInterface } from 'src/user/interfaces/user.interface';

export interface PaymentInterface extends Document {
  user: UserInterface;
  paymentMethod: string;
  deposits: string;
}
