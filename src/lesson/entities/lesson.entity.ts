import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Lesson {
  @Prop({
    type: String,
    required: true,
  })
  date: Date;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  teacherId: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  })
  groupId: string;
  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  students: [];
  @Prop({
    type: Number,
    required: true,
  })
  priceInCash: number;
  @Prop({
    type: Date,
    required: true,
  })
  startTime: Date;
  @Prop({
    type: Date,
    required: true,
  })
  endTime: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
