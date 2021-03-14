import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleInterface } from './interfaces/role.interface';
import { UserInterface } from '../user/interfaces/user.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role') private readonly roleModel: Model<RoleInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleInterface> {
    const user = await this.userModel.findById(createRoleDto.user).exec();
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const role = new this.roleModel(createRoleDto);
    return role.save();
  }

  async findAll(): Promise<RoleInterface[]> {
    const roles = await this.roleModel.find().populate('user', '-password -gender').exec();
    if (!roles || !roles[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return roles;
  }

  async findByID(id: string): Promise<RoleInterface> {
    const role = await this.roleModel.findOne({ _id: id }).populate('user', '-password -gender').exec();
    if (!role) {
      throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async findAllByUserID(userID: string): Promise<RoleInterface[]> {
    const roles = await this.roleModel.find().populate('user', '-password -gender').exec();
    let filtered = roles.filter((role) => {
      return role.user._id == userID;
    });
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return filtered;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel.findByIdAndUpdate({ _id: id }, updateRoleDto).exec();
    if (!role) {
      throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
    }
    return this.findByID(id);
  }

  async remove(id: string) {
    const role = await this.roleModel.deleteOne({ _id: id }).exec();
    if (role.deletedCount === 0) {
      throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
    }
    return role;
  }
}
