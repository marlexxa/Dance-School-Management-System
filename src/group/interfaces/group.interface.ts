import { Document } from 'mongoose';

export interface UserInterface extends Document {
  danceType: string;
  advanceLevel: string;
  teacherId: string[];
  studentId: string[];
  maxAmount: number;
  scheduleId: number;
}
