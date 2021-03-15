import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule as Mmodule } from '@nestjs-modules/mailer';
import { MailerConfig } from '../config/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    Mmodule.forRoot({
      transport: {
        host: MailerConfig.EMAIL_HOST,
        port: MailerConfig.EMAIL_PORT,
        secure: false,
        auth: {
          user: MailerConfig.EMAIL_ID,
          pass: MailerConfig.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"Dance School" <modules@nestjs.com>',
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
