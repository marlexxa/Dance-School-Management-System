import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Deposit } from '../../deposit/entities/deposit.entity';

@Schema()
export class Payment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;

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
