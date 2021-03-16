import { ScheduleInterface } from 'src/schedule/interfaces/schedule.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { AdvanceLevel } from '../enum/advance-level.enum';
import { DanceType } from '../enum/dance-type.enum';
export class CreateGroupDto {
  danceType: DanceType;
  advanceLevel: AdvanceLevel;
  teachers: UserInterface[];
  students: UserInterface[];
  maxAmount: number;
  schedule: ScheduleInterface;
}
