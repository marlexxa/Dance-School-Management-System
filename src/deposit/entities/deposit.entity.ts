import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Deposit {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: string;
  @Prop({
    type: Number,
    required: true,
  })
  amount: number;
  @Prop({
    type: Boolean,
    required: true,
  })
  isPaid: boolean;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
