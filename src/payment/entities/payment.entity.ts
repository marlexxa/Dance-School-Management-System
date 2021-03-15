import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Deposit } from 'src/deposit/entities/deposit.entity';
import { User } from 'src/user/entities/user.entity';

@Schema()
export class Payment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: String,
    required: true,
  })
  paymentMethod: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deposit',
    required: false,
  })
  deposits: Deposit;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
