import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';

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
  /*@Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Group',
    required: true,
  })
  groupId: GroupInterface;*/
  @Prop({
    type: String,
    required: true,
  })
  phoneNumber;
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
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
