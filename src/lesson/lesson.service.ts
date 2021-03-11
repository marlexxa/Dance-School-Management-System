import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonInterface } from './interfaces/lesson.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LessonService {
  constructor(@InjectModel('Lesson') private readonly lessonModel: Model<LessonInterface>) {}

  async create(createLessonDto: CreateLessonDto) {
    const lesson = await new this.lessonModel(createLessonDto);
    return lesson.save();
  }
  async findAll() {
    console.log('FIND ALL');
    const lessons = await this.lessonModel.find().exec();
    if (!lessons || !lessons[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lessons;
  }

  async findOne(id: string) {
    console.log('FIND ONE');
    const lesson = await this.lessonModel.findOne({ _id: id }).exec();
    if (!lesson) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonModel.findByIdAndUpdate({ _id: id }, updateLessonDto).exec();
    if (!lesson) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lesson;
  }

  async remove(id: string) {
    const lesson = await this.lessonModel.deleteOne({ _id: id }).exec();
    if (lesson.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lesson;
  }
}
