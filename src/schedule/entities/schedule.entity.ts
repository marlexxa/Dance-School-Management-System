import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Schedule {
  @Prop({
    type: String,
    required: true,
  })
  id: string;
  @Prop({
    type: Array,
    required: true,
  })
  lessons: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
