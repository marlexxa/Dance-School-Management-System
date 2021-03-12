import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleType } from '../enum/role.enum';
import { User } from '../../user/entities/user.entity';
import * as mongoose from 'mongoose';

@Schema()
export class Role {
  @Prop({
    type: String,
    enum: RoleType,
    required: true,
  })
  roleType: RoleType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
