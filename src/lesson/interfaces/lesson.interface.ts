/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface LessonInterface extends Document {
  date: Date;
  teacherId: number;
  groupId: number;
  students: string[];
  priceInCash: number;
  startTime: string;
  endTime: string;
}
