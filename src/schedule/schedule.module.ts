import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchema } from './entities/schedule.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Schedule',
        schema: ScheduleSchema,
      },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
