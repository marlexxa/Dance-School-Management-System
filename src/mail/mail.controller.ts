import { Body, Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { DirectMailDto } from './dto/directMailDto';

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  sendMail(@Body() directMailDto: DirectMailDto): any {
    return this.mailService.sendMail(directMailDto);
  }
}
