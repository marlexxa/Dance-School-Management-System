/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { database } from './constants';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreatePhoneDto } from 'src/phone/dto/create-phone.dto';

describe('PHONES', () => {
  let app: INestApplication;
  let phones;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await mongoose.connect(database);
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async (done) => {
    await mongoose.disconnect(done);
  });

  const CreatePhoneDTOS: CreatePhoneDto[] = [
    {
      userId: '1',
      phoneNumber: '123456789',
    },
    {
      userId: '2',
      phoneNumber: '987654321',
    },
    {
      userId: '3',
      phoneNumber: '111111111',
    },
    {
      userId: '4',
      phoneNumber: '222222222',
    },
    {
      userId: '5',
      phoneNumber: '333333333',
    },
  ];

  CreatePhoneDTOS.map((CreatePhoneDto) => {
    it('should create phone', async () => {
      return request(app.getHttpServer())
        .post('/phone')
        .set('Accept', 'application/json')
        .send(CreatePhoneDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.userId).toEqual(CreatePhoneDto.userId);
          expect(body.phoneNumber).toEqual(CreatePhoneDto.phoneNumber);
        });
    });
  });

  it('should get allphones', async () => {
    return request(app.getHttpServer())
      .get('/phone')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(5);
        phones = body;
      });
  });

  it('should update first phone', async () => {
    request(app.getHttpServer()).put(`/phone/${phones[0]._id}`).set('Accept', 'application/json').send({
      userId: '6',
      phoneNumber: '666666666',
    });
    return request(app.getHttpServer())
      .get(`/phone/${phones[0]._id}`)
      .expect(({ body }) => {
        expect(body.userId).toEqual('6');
        expect(body.phoneNumber).toEqual('666666666');
      });
  });

  it('should delete last phone', async () => {
    return request(app.getHttpServer())
      .delete(`/phone/${phones[phones.length - 1]._id}`)
      .set('Accept', 'application/json')
      .expect(200);
  });
});
