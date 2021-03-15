import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PassTest } from './passTests';
import { UserTests } from './userTests';
import { PhoneTests } from './phoneTests';
import { DepositTest } from './depositTests';
import { LessonTests } from './lessonTests';

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
  PassTest();
  PhoneTests();
  DepositTest();
  LessonTests();
});
