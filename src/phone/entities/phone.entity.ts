/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/entities/user.entity';
import * as mongoose from 'mongoose';
@Schema()
export class Phone {
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
  phoneNumber: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
