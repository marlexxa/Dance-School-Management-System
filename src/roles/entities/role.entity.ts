import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Role {
  @Prop({
    type: String,
    required: true,
  })
  role: string;
  @Prop({
    type: String,
    required: true,
  })
  userID: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
