import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  id: string;
  date: Date;
  teacherId: number;
  groupId: number;
  students: string[];
  priceInCash: number;
  startTime: string;
  endTime: string;
}
