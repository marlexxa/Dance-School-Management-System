import { UserInterface } from 'src/user/interfaces/user.interface';
import { AdvanceLevel } from '../enum/advance-level.enum';
import { DanceType } from '../enum/dance-type.enum';
import { ScheduleInterface } from '../../schedule/interfaces/schedule.interface';

export class CreateGroupDto {
  danceType: DanceType;
  advanceLevel: AdvanceLevel;
  teachers: UserInterface[];
  students: UserInterface[];
  maxAmount: number;
  schedule: ScheduleInterface;
}
