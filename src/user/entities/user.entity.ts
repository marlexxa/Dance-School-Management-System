/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;
  @Prop({
    type: String,
    required: true,
  })
  surname: string;
  @Prop({
    type: String,
    required: true,
  })
  mail: string;
  @Prop({
    type: String,
    required: true,
  })
  password: string;
  @Prop({
    type: String,
    required: true,
  })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
