import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RegisterMailDto } from './dto/registerMailDto';
import { DirectMailDto } from './dto/directMailDto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendMail(directMailDto: DirectMailDto): void {
    this.mailerService
      .sendMail({
        to: directMailDto.recipientMail,
        from: directMailDto.senderMail,
        subject: directMailDto.subject,
        template: 'directMail',
        context: {
          recipientName: directMailDto.recipientName,
          senderName: directMailDto.senderName,
          senderMail: directMailDto.senderMail,
          content: directMailDto.content,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*


    /!*@Cron('******')*!/
    /!*@Cron(CronExpression.EVERY_MINUTE)*!/
    public sendMailEveryMinute(): void {
        this.mailerService
            .sendMail({
                to: 'dance.school.menagement@gmail.com',
                from: 'Consultation <noreply@nestjs.com>',
                subject: 'Testing Nest MailModule ✔',
                template: 'directMail',
                context: {
                    code: 'cf1a3f828287',
                    username: 'john doe',
                    date: Date.now(),
                    lessons: [1,2,3,4,5,6,7]
                },
            })
            .then((success) => {
                console.log(success)
            })
            .catch((err) => {
                console.log(err)
            });
    }*/

  public sendMailWhenRegistered(registerMailDto: RegisterMailDto): void {
    this.mailerService
      .sendMail({
        to: registerMailDto.mail,
        from: 'Reception <noreply@nestjs.com>',
        subject: `Witaj ${registerMailDto.name} `,
        template: 'registerMail',
        context: {
          name: registerMailDto.name,
          surname: registerMailDto.surname,
          mail: registerMailDto.mail,
          password: registerMailDto.password,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public sendMailWhenUpdated(registerMailDto: RegisterMailDto): void {
    this.mailerService
      .sendMail({
        to: registerMailDto.mail,
        from: 'Reception <noreply@nestjs.com>',
        subject: `Witaj ${registerMailDto.name} - zmiana danych `,
        template: 'updateMail',
        context: {
          name: registerMailDto.name,
          surname: registerMailDto.surname,
          mail: registerMailDto.mail,
          password: registerMailDto.password,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
