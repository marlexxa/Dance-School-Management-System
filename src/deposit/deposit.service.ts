import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Injectable()
export class DepositService {
  create(createDepositDto: CreateDepositDto) {
    return 'This action adds a new deposit';
  }

  findAll() {
    return `This action returns all deposit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deposit`;
  }

  update(id: number, updateDepositDto: UpdateDepositDto) {
    return `This action updates a #${id} deposit`;
  }

  remove(id: number) {
    return `This action removes a #${id} deposit`;
  }
}
