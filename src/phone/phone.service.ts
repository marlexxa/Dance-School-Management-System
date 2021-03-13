/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhoneInterface } from './interfaces/phone.interface';
import { UserInterface } from '../user/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PhoneService {
  constructor(
    @InjectModel('Phone') private readonly phoneModel: Model<PhoneInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async create(createPhoneDto: CreatePhoneDto) {
    const user = await this.userModel.findById(createPhoneDto.user).exec();
    if (user) {
      const pass = await new this.phoneModel(createPhoneDto);
      return pass.save();
    } else {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
  }
  async findAll(): Promise<PhoneInterface[]> {
    const phones = await this.phoneModel.find().populate('user', '-password -gender').exec();

    if (!phones || !phones[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return phones;
  }

  async findByID(id: string): Promise<PhoneInterface> {
    const phone = await this.phoneModel.findOne({ _id: id }).populate('user', '-password -gender').exec();
    if (!phone) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return phone;
  }
  async findAllByUserID(userId: string): Promise<PhoneInterface[]> {
    const phones = await this.phoneModel.find().populate('user', '-password -gender').exec();
    let filtered = phones.filter((pass) => {
      return pass.user._id == userId;
    });
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return filtered;
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto) {
    const phone = await this.phoneModel.findByIdAndUpdate({ _id: id }, updatePhoneDto).exec();
    if (!phone) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return phone;
  }

  async remove(id: string) {
    const phone = await this.phoneModel.deleteOne({ _id: id }).exec();
    if (phone.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return phone;
  }
}
