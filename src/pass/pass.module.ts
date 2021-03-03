import { Module } from '@nestjs/common';
import { PassService } from './pass.service';
import { PassController } from './pass.controller';

@Module({
  controllers: [PassController],
  providers: [PassService],
})
export class PassModule {}
