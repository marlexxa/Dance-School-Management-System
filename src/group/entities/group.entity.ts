import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Group {
  @Prop({
    type: String,
    required: true,
  })
  danceType: string;
  @Prop({
    type: String,
    required: true,
  })
  advanceLevel: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  teachers: string[];
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  students: string[];
  @Prop({
    type: Number,
    required: true,
  })
  maxAmount: number;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true,
  })
  scheduleID: number;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
