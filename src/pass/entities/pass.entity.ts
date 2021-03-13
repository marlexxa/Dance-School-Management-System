import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/entities/user.entity';
import * as mongoose from 'mongoose';

@Schema()
export class Pass {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user;
  /* group: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Group',
         required: true
     }*/
  @Prop({
    type: Date,
    required: true,
  })
  startDate;
  @Prop({
    type: Date,
    required: true,
  })
  endDate;
  @Prop({
    type: Number,
    required: true,
  })
  remainingNumber;
  @Prop({
    type: Number,
    required: true,
  })
  price;
}

export const PassSchema = SchemaFactory.createForClass(Pass);
