import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Deposit {
  @Prop({
    type: String,
    required: true,
  })
  id: string;
  @Prop({
    type: String,
    required: true,
  })
  idUser: string;
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
