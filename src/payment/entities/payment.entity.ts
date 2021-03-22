import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Deposit } from '../../deposit/entities/deposit.entity';
import { User } from '../../user/entities/user.entity';
import { PaymentMethod } from '../enums/paymentMethod.enum';

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
  paymentMethod: PaymentMethod;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deposit',
      },
    ],
    required: false,
  })
  deposit: Deposit[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
