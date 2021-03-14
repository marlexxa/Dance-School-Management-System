import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentInterface } from './interfaces/payment.interface';

@Injectable()
export class PaymentService {
  constructor(@InjectModel('Payment') private readonly paymentModel: Model<PaymentInterface>) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await new this.paymentModel(createPaymentDto);
    return payment.save();
  }

  async findAll() {
    const payment = await this.paymentModel.find().exec();
    if (!payment || !payment[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  async findAllPaymentsForUser(userId: User) {
    const user = await this.paymentModel.find({ userId }).exec();
    if (!user || !user[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findOne({ _id: id }).exec();
    if (!payment) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByIdAndUpdate({ _id: id }, updatePaymentDto).exec();
    if (!payment) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const payment = await this.paymentModel.deleteOne({ _id: id }).exec();
    if (payment.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }
}
