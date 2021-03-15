import { UserInterface } from '../../user/interfaces/user.interface';
// import { GroupInterface } from '../../group/interfaces/group.interface';

export class CreateLessonDto {
  date: Date;
  teacher: string;
  // group: GroupInterface;
  student: UserInterface;
  priceInCash: number;
  startTime: Date;
  endTime: Date;
}
