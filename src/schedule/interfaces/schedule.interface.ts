import { Document } from 'mongoose';
import { LessonInterface } from '../../lesson/interfaces/lesson.interface';

export interface ScheduleInterface extends Document {
  lessons: LessonInterface;
}
