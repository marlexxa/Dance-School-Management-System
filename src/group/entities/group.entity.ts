import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    type: String,
    required: true,
  })
  teacherId: string[];
  @Prop({
    type: String,
    required: true,
  })
  studentId: string[];
  @Prop({
    type: Number,
    required: true,
  })
  maxAmount: number;
  @Prop({
    type: Number,
    required: true,
  })
  scheduleId: number;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
