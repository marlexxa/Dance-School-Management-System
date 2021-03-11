import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  id?: string;
  danceType: string;
  advanceLevel: string;
  teacherId: string[];
  studentId: string[];
  maxAmount: number;
  scheduleId: number;
}
