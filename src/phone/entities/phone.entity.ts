/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Phone {
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // })
  // userId: User;
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
