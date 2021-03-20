import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentInterface } from './interfaces/payment.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<PaymentInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const user = await this.userModel.findById(createPaymentDto.user).exec();

    if (user) {
      const payment = await new this.paymentModel(createPaymentDto);
      return payment.save();
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    const payment = await this.paymentModel.find().populate('user', '-gender -password').populate('deposit', '-user').exec();
    if (!payment || !payment[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  async findAllByUserID(userID: string) {
    const payments = await this.paymentModel.find().populate('user', '-password -gender').populate('deposit', '-user').exec();
    let filtered = payments.filter((payment) => {
      return payment.user._id == userID;
    });
    if (!filtered || !filtered[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return filtered;
  }

  async findOne(id: string) {
    console.log(id);
    const payment = await this.paymentModel.findOne({ _id: id }).populate('user', '-password -gender').populate('deposit', '-user').exec();
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
