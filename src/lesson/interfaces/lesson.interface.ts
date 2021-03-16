/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { UserInterface } from 'src/user/interfaces/user.interface';
// import { GroupInterface } from '../../group/interfaces/group.interface';

export interface LessonInterface extends Document {
  date: Date;
  teacher: [UserInterface];
  // group: GroupInterface[];
  students: [UserInterface];
  priceInCash: number;
  startTime: Date;
  endTime: Date;
}
