import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Payment {
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  paymentMethod: string;

  @Prop({
    type: Number,
    required: true,
  })
  deposits: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
