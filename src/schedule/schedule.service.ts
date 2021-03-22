import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleInterface } from './interfaces/schedule.interface';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel('Schedule') private readonly scheduleModel: Model<ScheduleInterface>) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const schedule = await new this.scheduleModel(createScheduleDto);
    return schedule.save();
  }

  async findAll() {
    const schedules = await this.scheduleModel.find().exec();
    if (!schedules || !schedules[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return schedules;
  }

  async findOne(id: string) {
    const schedule = await this.scheduleModel.findOne({ _id: id }).exec();
    if (!schedule) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return schedule;
  }

  async findScheduleByLesson(id: string) {
    const schedules = await this.scheduleModel.find().exec();

    // schedules.forEach((schedule) => {
    //   schedule.lessons.forEach((lesson) => {
    //     if (lesson._id == id) {
    //       return schedule;
    //     }
    //   });
    // });

    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleModel.findByIdAndUpdate({ _id: id }, updateScheduleDto).exec();
    if (!schedule) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const schedule = await this.scheduleModel.deleteOne({ _id: id }).exec();
    if (schedule.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return schedule;
  }
}
