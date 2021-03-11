import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleType } from '../enum/role.enum';

@Schema()
export class Role {
  @Prop({
    type: String,
    enum: RoleType,
    required: true,
  })
  roleType;

  @Prop({
    type: String,
    required: true,
  })
  userID: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
