import { Document } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export interface PaymentInterface extends Document {
  userId: User;
  paymentMethod: string;
  deposits: string;
}
