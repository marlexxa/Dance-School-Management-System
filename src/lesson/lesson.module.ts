import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonSchema } from './entities/lesson.entity';
import { UserSchema } from '../user/entities/user.entity';
// import { GroupSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Lesson',
        schema: LessonSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    // MongooseModule.forFeature([
    //   {
    //     name: 'Group',
    //     schema: GroupSchema,
    //   },
    // ]),
  ],

  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
