import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entities/group.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { ScheduleSchema } from '../schedule/entities/schedule.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Group',
        schema: GroupSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Schedule',
        schema: ScheduleSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
