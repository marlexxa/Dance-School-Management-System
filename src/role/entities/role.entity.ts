import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleType } from '../enum/role.enum';
import * as mongoose from 'mongoose';

@Schema()
export class Role {
  @Prop({
    type: String,
    enum: RoleType,
    required: true,
  })
  roleType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
