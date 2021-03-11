/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhoneInterface } from './interfaces/phone.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PhoneService {
  // to dodam do konstruktora gdy polacze to z userem @InjectModel('User') private readonly userModel: Model<UserInterface>,
  constructor(@InjectModel('Phone') private readonly phoneModel: Model<PhoneInterface>) {}

  async create(createPhoneDto: CreatePhoneDto) {
    // const user = await this.userModel.findById(createPassDto.user).exec();
    // if (user) {
    //   const pass = await new this.passModel(createPassDto);
    //   return pass.save();
    // } else {
    //   throw new HttpException('User or Group Not Found', HttpStatus.NOT_FOUND);
    // }
    const phone = await new this.phoneModel(createPhoneDto);
    return phone.save();
  }
  async findAll() {
    const phones = await this.phoneModel.find().exec();
    if (!phones || !phones[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return phones;
  }

  async findOne(id: string) {
    const phone = await this.phoneModel.findOne({ _id: id }).exec();
    if (!phone) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return phone;
  }
  async findOneByUser(userId: string) {
    const phone = await this.phoneModel.find({ userId: userId }).exec();
    if (!phone) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return phone;
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
