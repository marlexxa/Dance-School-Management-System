export class CreateLessonDto {
  date: Date;
  teacherId: number;
  groupId: number;
  students: string[];
  priceInCash: number;
  startTime: string;
  endTime: string;
}
