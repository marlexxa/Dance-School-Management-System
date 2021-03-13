import { UserInterface } from 'src/user/interfaces/user.interface';

export class CreateGroupDto {
  danceType: string;
  advanceLevel: string;
  teachers: UserInterface[];
  students: UserInterface[];
  maxAmount: number;
  scheduleId: string;
}
