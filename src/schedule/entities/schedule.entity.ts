import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Schedule {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  })
  lessonId: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
