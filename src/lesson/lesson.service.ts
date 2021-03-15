import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonInterface } from './interfaces/lesson.interface';
import { UserInterface } from '../user/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<LessonInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}
  async create(createLessonDto: CreateLessonDto) {
    const lesson = await new this.lessonModel(createLessonDto);
    return lesson.save();
  }

  async findAll(): Promise<LessonInterface[]> {
    const lessons = await this.lessonModel.find().exec();
    if (!lessons || !lessons[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lessons;
  }

  async findByID(id: string): Promise<LessonInterface> {
    const lesson = await this.lessonModel.findOne({ _id: id }).exec();
    if (!lesson) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lesson;
  }

  async findAllByDate(date: Date): Promise<LessonInterface[]> {
    const lessons = await this.lessonModel.find().exec();
    const filtered = lessons.filter((lesson) => {
      return lesson.date == date;
    });
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return filtered;
  }

  async findAllByUserID(userID: string): Promise<LessonInterface[]> {
    const lessons = await this.lessonModel.find().populate('user', '-password -gender').exec();
    const filtered = lessons.filter((lesson) => {
      lesson.students.forEach((student) => {
        return student._id == userID;
      });
    });
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return filtered;
  }

  // async findAllByGroupID(groupID: string): Promise<LessonInterface[]> {
  //   const lessons = await this.lessonModel.find().populate('group').exec();
  //   const filtered = lessons.filter((lesson) => {
  //     return lesson.group._id == groupID;
  //   });
  //   if (!filtered || !filtered[0]) {
  //     throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  //   }
  //   return filtered;
  // }

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
