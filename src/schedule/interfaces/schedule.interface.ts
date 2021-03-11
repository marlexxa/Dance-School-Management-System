import { Document } from 'mongoose';

export interface ScheduleInterface extends Document {
  lessons: string[];
}
