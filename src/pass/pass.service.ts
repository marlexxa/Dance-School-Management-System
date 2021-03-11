import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePassDto } from './dto/create-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassInterface } from './interfaces/pass.interface';
import { UserInterface } from '../user/interfaces/user.interface';

@Injectable()
export class PassService {
  constructor(
    @InjectModel('Pass') private readonly passModel: Model<PassInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>, //@InjectModel('Group') private  readonly groupModel: Model<GroupInterface>
  ) {}

  async findAll(): Promise<PassInterface[]> {
    const passes = await this.passModel.find().populate('user', '-password -gender').exec();

    if (!passes || !passes[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return passes;
  }

  async findByID(id: string): Promise<PassInterface> {
    const pass = await this.passModel.findOne({ _id: id }).populate('user', '-password -gender').exec();
    if (!pass) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return pass;
  }

  async findAllByUserID(userId: string): Promise<PassInterface[]> {
    const passes = await this.passModel.find().populate('user', '-password -gender').exec();
    let filtered = passes.filter((pass) => {
      return pass.user._id == userId;
    });
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return filtered;
  }

  /*async findAllByGroupID(groupId: string): Promise<PassInterface[]> {
    const passes = await this.passModel
    .find()
    .populate('group')
    .exec()
    let filtered = passes.filter((pass) => {
      return pass.group == groupId;
    })
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return filtered
  }*/

  async create(createPassDto: CreatePassDto) {
    const user = await this.userModel.findById(createPassDto.user).exec();

    /*const group = await this.groupModel.findById(createPassDto.group)
        .exec();*/

    if (user) {
      const pass = await new this.passModel(createPassDto);
      return pass.save();
    } else {
      throw new HttpException('User or Group Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updatePassDto: UpdatePassDto) {
    const pass = await this.passModel.findByIdAndUpdate({ _id: id }, updatePassDto).exec();
    if (!pass) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.findByID(id);
  }

  async remove(id: string) {
    const pass = await this.passModel.deleteOne({ _id: id }).exec();
    if (pass.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return pass;
  }
}
