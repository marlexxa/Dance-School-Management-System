import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  @Prop({
    type: [String],
    enum: Role,
    lowercase: true,
    required: true,
  })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
