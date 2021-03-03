import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';

@Module({
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
