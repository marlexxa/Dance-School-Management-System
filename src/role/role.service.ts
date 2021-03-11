import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleInterface } from './interfaces/role.interface';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<RoleInterface>) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await new this.roleModel(createRoleDto);
    return role.save();
  }

  async findAll() {
    const roles = await this.roleModel.find().exec();
    if (!roles || !roles[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return roles;
  }

  async findOne(id: string) {
    const role = await this.roleModel.findOne({ _id: id }).exec();
    if (!role) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel.findByIdAndUpdate({ _id: id }, updateRoleDto).exec();
    if (!role) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async remove(id: string) {
    const role = await this.roleModel.deleteOne({ _id: id }).exec();
    if (role.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return role;
  }
}
