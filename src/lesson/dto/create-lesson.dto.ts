import { UserInterface } from '../../user/interfaces/user.interface';
import { GroupInterface } from '../../group/interfaces/group.interface';
import { Classroom } from '../enums/Classroom.enum';

export class CreateLessonDto {
  date: Date;
  teachers: UserInterface[];
  group: GroupInterface;
  students: UserInterface[];
  priceInCash: number;
  startTime: Date;
  endTime: Date;
  classroom: Classroom;
}
