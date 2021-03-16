import { UserInterface } from '../../user/interfaces/user.interface';
// import { GroupInterface } from '../../group/interfaces/group.interface';

export class CreateLessonDto {
  date: Date;
  teachers: [UserInterface];
  // group: GroupInterface;
  students: [UserInterface];
  priceInCash: number;
  startTime: Date;
  endTime: Date;
}
