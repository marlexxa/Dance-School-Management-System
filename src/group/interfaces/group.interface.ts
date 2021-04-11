import { Document } from 'mongoose';
import { ScheduleInterface } from 'src/schedule/interfaces/schedule.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';
export interface GroupInterface extends Document {
  danceType: string;
  advanceLevel: string;
  teachers: UserInterface[];
  students: UserInterface[];
  maxAmount: number;
  schedule: ScheduleInterface;
}
