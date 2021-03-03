import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';

@Module({
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
