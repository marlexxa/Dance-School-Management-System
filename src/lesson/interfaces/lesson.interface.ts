import { Document } from 'mongoose';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { GroupInterface } from '../../group/interfaces/group.interface';

export interface LessonInterface extends Document {
  date: Date;
  teachers: UserInterface[];
  group: GroupInterface;
  students: UserInterface[];
  priceInCash: number;
  startTime: Date;
  endTime: Date;
}
