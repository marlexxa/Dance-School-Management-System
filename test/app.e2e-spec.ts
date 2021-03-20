import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PassTests } from './passTests';
import { UserTests } from './userTests';
import { PhoneTests } from './phoneTests';
import { DepositTest } from './depositTests';
import { LessonTests } from './lessonTests';
import { PaymentTest } from './paymentTests';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  UserTests();
  PassTests();
  PhoneTests();
  DepositTest();
  LessonTests();
  PaymentTest();
});
