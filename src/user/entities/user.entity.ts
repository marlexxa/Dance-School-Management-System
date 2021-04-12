import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';

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
    unique: true,
  })
  mail: string;
  @Prop({
    type: String,
    required: true,
  })
  password: string;
  @Prop({
    type: String,
    enum: Gender,
    lowercase: true,
    required: true,
  })
  gender: Gender;
  @Prop({
    type: [String],
    enum: Role,
    lowercase: true,
    required: true,
  })
  role: Role[];
  @Prop({
    type: String,
    lowercase: true,
    required: false,
  })
  comment;
  @Prop({
    type: String,
    lowercase: true,
    required: false,
  })
  phoneNumber;
}

export const UserSchema = SchemaFactory.createForClass(User);
