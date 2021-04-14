import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Group } from '../../group/entities/group.entity';
import { AdvanceLevel } from '../../group/enum/advance-level.enum';

@Schema()
export class Lesson {
  @Prop({
    type: Date,
    required: true,
  })
  date;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  })
  teachers;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  })
  group;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  })
  students;
  @Prop({
    type: Number,
    required: true,
  })
  priceInCash: number;
  @Prop({
    type: Date,
    required: true,
  })
  startTime;
  @Prop({
    type: Date,
    required: true,
  })
  endTime;
  @Prop({
    type: String,
    enum: AdvanceLevel,
    lowercase: true,
    required: true,
  })
  classroom;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
