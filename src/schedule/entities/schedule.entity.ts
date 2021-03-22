import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Lesson } from '../../lesson/entities/lesson.entity';

@Schema()
export class Schedule {
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Lesson',
    required: true,
  })
  lessons;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
