import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Phone, PhoneSchema } from './entities/phone.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Phone',
        schema: PhoneSchema,
      },
    ]),
  ],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
