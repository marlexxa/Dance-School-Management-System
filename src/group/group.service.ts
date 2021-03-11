import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupInterface } from './interfaces/group.interface';
@Injectable()
export class GroupService {
  constructor(@InjectModel('Group') private readonly groupModel: Model<GroupInterface>) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = await new this.groupModel(createGroupDto);
    return group.save();
  }

  async findAll() {
    const groups = await this.groupModel.find().exec();
    if (!groups || !groups[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return groups;
  }

  async findOne(id: string) {
    const group = await this.groupModel.findOne({ _id: id }).exec();
    if (!group) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupModel.findByIdAndUpdate({ _id: id }, updateGroupDto).exec();
    if (!group) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
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
