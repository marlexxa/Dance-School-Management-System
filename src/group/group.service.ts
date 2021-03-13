import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupInterface } from './interfaces/group.interface';
import { UserInterface } from 'src/user/interfaces/user.interface';
@Injectable()
export class GroupService {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<GroupInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = await new this.groupModel(createGroupDto);
    return group.save();
  }

  async findAll(): Promise<GroupInterface[]> {
    const groups = await this.groupModel.find().exec();
    if (!groups || !groups[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return groups;
  }

  async findAllByAdvanceLevel(advanceLevel: string): Promise<GroupInterface[]> {
    const groups = await this.groupModel.find().exec();
    const filtered = groups.filter((group) => {
      return group.advanceLevel == advanceLevel;
    });
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return groups;
  }

  async findAllByDanceType(danceType: string): Promise<GroupInterface[]> {
    const groups = await this.groupModel.find().exec();
    const filtered = groups.filter((group) => {
      return group.danceType == danceType;
    });
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found - findAllByDanceType', HttpStatus.NOT_FOUND);
    }
    return groups;
  }

  async findAllByTeacherId(teacherId: string): Promise<GroupInterface[]> {
    const groups = await this.groupModel.find().populate('user', '-password -gender').exec();
    const temp = [];
    groups.forEach((group) => {
      group.teachers.forEach((teacher) => {
        //też chyba do poprawy cała funkcja
        if (teacher._id == teacherId) {
          temp.push(teacher);
        }
      });
    });
    if (temp === undefined || temp.length === 0) {
      throw new HttpException('Not Found - findAllByTeacherId', HttpStatus.NOT_FOUND);
    }
    return groups;
  }

  async findAllByStudentId(studentId: string): Promise<GroupInterface[]> {
    const groups = await this.groupModel.find().populate('user', '-password -gender').exec();
    const filtered = groups.filter((group) => {
      return group.students._id == studentId;
    }); // do poprawy
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found - findAllByStudentId', HttpStatus.NOT_FOUND);
    }
    return groups;
  }

  async findOne(id: string) {
    const group = await this.groupModel.findOne({ _id: id }).populate('user', '-password -gender').exec();
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupModel.findByIdAndUpdate({ _id: id }, updateGroupDto).exec();
    if (!group) {
      throw new HttpException('Not Found any group', HttpStatus.NOT_FOUND);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const group = await this.groupModel.deleteOne({ _id: id }).exec();
    if (group.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return group;
  }
}
