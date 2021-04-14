import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { AdvanceLevel } from '../enum/advance-level.enum';
import { DanceType } from '../enum/dance-type.enum';

@Schema()
export class Group {
  @Prop({
    type: String,
    enum: DanceType,
    lowercase: true,
    required: true,
  })
  danceType;
  @Prop({
    type: String,
    enum: AdvanceLevel,
    lowercase: true,
    required: true,
  })
  advanceLevel;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  })
  teachers;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  })
  students: User[];
  @Prop({
    type: Number,
    required: true,
  })
  maxAmount: number;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: false,
  })
  schedule;
  @Prop({
    type: String,
    required: false,
  })
  comment;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
