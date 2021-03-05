import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findOne(id: string) {
    const payment = await this.paymentModel.findOne({ _id: id }).exec();
    if (!payment) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByIdAndUpdate({ _id: id }, updatePaymentDto).exec();
    if (!payment) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  async remove(id: number) {
    const payment = await this.paymentModel.deleteOne({ _id: id }).exec();
    if (payment.deletedCount === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }
}
