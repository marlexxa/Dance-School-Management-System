import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { PaymentModule } from './payment/payment.module';
import { PassModule } from './pass/pass.module';
import { PhoneModule } from './phone/phone.module';
import { DepositModule } from './deposit/deposit.module';
import { LessonModule } from './lesson/lesson.module';
import { ScheduleModule } from './schedule/schedule.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUri } from './config/mongo';

@Module({
  imports: [
    UserModule,
    GroupModule,
    PaymentModule,
    PassModule,
    PhoneModule,
    DepositModule,
    LessonModule,
    ScheduleModule,
    MongooseModule.forRoot(mongoUri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
