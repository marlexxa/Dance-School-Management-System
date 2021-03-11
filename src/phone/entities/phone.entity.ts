/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Phone {
  @Prop({
    type: String,
    required: true,
  })
  userId: string;
  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
