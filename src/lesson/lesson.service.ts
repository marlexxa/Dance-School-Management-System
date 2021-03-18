import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonInterface } from './interfaces/lesson.interface';
import { UserInterface } from '../user/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<LessonInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>, // @InjectModel('Group') private readonly groupModel: Model<GroupInterface>,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const lesson = await new this.lessonModel(createLessonDto);
    return lesson.save();
  }

  async findAll(): Promise<LessonInterface[]> {
    const lessons = await this.lessonModel
      .find()
      .populate({ path: 'students', model: User, select: '-password' })
      .populate({ path: 'teachers', model: User, select: '-password' })
      .exec();
    if (!lessons || !lessons[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lessons;
  }

  async findByID(id: string): Promise<LessonInterface> {
    const lesson = await this.lessonModel
      .findOne({ _id: id })
      .populate({ path: 'students', model: User, select: '-password' })
      .populate({ path: 'teachers', model: User, select: '-password' })
      .exec();
    if (!lesson) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lesson;
  }

  async findAllByDate(date: Date): Promise<LessonInterface[]> {
    const lessons = await this.lessonModel.find({ date: date }).exec();
    if (!lessons || !lessons[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lessons;
  }

  async findAllByTeacherID(userID: string): Promise<LessonInterface[]> {
    const lessons = await this.lessonModel
      .find({
        teachers: {
          $elemMatch: { $in: { _id: userID } },
        },
      })
      .populate({ path: 'students', model: User, select: '-password' })
      .populate({ path: 'teachers', model: User, select: '-password' })
      .exec();
    if (!lessons || !lessons[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lessons;
  }

  async findAllByStudentID(userID: string): Promise<LessonInterface[]> {
    const lessons = await this.lessonModel
      .find({
        students: {
          $elemMatch: { $in: { _id: userID } },
        },
      })
      .populate({ path: 'students', model: User, select: '-password' })
      .populate({ path: 'teachers', model: User, select: '-password' })
      .exec();
    if (!lessons || !lessons[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lessons;
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
    return this.findByID(id);
  }

  async remove(id: string) {
    const lesson = await this.lessonModel.deleteOne({ _id: id }).exec();
    if (lesson.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return lesson;
  }
}
