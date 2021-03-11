import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './entities/lesson.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Lesson',
        schema: LessonSchema,
      },
    ]),
  ],

  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
