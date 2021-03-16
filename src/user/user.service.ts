import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>, private readonly mailService: MailService) {}

  async findAll() {
    const users = await this.userModel.find().exec();
    if (!users || !users[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await new this.userModel(createUserDto);
    if (user) {
      this.mailService.sendMailWhenRegistered({
        name: user.name,
        surname: user.surname,
        mail: user.mail,
        password: user.password,
      });
    }
    return user.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto).exec();
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = await this.findOne(id);
    this.mailService.sendMailWhenUpdated({
      name: updatedUser.name,
      surname: updatedUser.surname,
      mail: updatedUser.mail,
      password: updatedUser.password,
    });
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userModel.deleteOne({ _id: id }).exec();
    if (user.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
