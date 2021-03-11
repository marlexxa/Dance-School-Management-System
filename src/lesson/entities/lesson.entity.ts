import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Lesson {
  @Prop({
    type: String,
    required: true,
  })
  date: string;
  @Prop({
    type: String,
    required: true,
  })
  teacherId: string;
  @Prop({
    type: String,
    required: true,
  })
  groupId: string;
  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;
  @Prop({
    type: String,
    required: true,
  })
  students: [];
  @Prop({
    type: String,
    required: true,
  })
  priceInCash: number;
  @Prop({
    type: String,
    required: true,
  })
  startTime: string;
  @Prop({
    type: String,
    required: true,
  })
  endTime: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
