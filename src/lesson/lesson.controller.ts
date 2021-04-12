import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  async findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.lessonService.findByID(id);
  }

  @Get('dates/:date')
  findAllByDate(@Param('date') date: Date) {
    return this.lessonService.findAllByDate(date);
  }

  @Get('teachers/:userID')
  findAllByTeacherID(@Param('userID') userID: string) {
    return this.lessonService.findAllByTeacherID(userID);
  }

  @Get('students/:userID')
  findAllByStudentID(@Param('userID') userID: string) {
    return this.lessonService.findAllByStudentID(userID);
  }

  @Get('groups/:groupID')
  findAllByGroupID(@Param('groupID') groupID: string) {
    return this.lessonService.findAllByGroupID(groupID);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
