/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { UserInterface } from 'src/user/interfaces/user.interface';

export interface LessonInterface extends Document {
  date: Date;
  teacherId: number;
  groupId: number;
  students: UserInterface[];
  priceInCash: number;
  startTime: string;
  endTime: string;
}
