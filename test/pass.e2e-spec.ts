import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../dist/app.module';
import * as mongoose from 'mongoose';
import { database } from './constants';
import { CreateUserDto } from '../dist/user/dto/create-user.dto';
import * as request from 'supertest';
import { CreatePassDto } from '../dist/pass/dto/create-pass.dto';

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect(done);
});

describe('USER', () => {
  let app: INestApplication;
  let createdUser;
  let createdPass;
  let fetchedPasses;

  const createUserDto: CreateUserDto = {
    name: 'JANUSZ',
    surname: 'GRZYWACZ',
    mail: 'jon.doe@mail.com',
    password: 'password',
    gender: 'male',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/user')
      .set('Accept', 'application/json')
      .send(createUserDto)
      .expect(({ body }) => {
        createdUser = body;
      });
  });

  it('should create pass to existing user', async () => {
    return request(app.getHttpServer())
      .post('/pass')
      .set('Accept', 'application/json')
      .send({
        user: createdUser._id,
        startDate: '04-24-2021',
        endDate: '04-24-2021',
        remainingNumber: 20,
        price: 80,
      })
      .expect(201)
      .expect(({ body }) => {
        createdPass = body;
        expect(body.user).toEqual(createdUser._id);
      });
  });

  it('should not create pass to not existing user', async () => {
    return request(app.getHttpServer())
      .post('/pass')
      .set('Accept', 'application/json')
      .send({
        user: 'someVALUE',
        startDate: '04-24-2021',
        endDate: '04-24-2021',
        remainingNumber: 20,
        price: 80,
      })
      .expect(500);
  });

  it('should get allPasses', async () => {
    return request(app.getHttpServer())
      .get('/pass')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        fetchedPasses = body;
      });
  });

  it('should update pass', async () => {
    return request(app.getHttpServer())
      .put(`/pass/${fetchedPasses[0]._id}`)
      .set('Accept', 'application/json')
      .send({
        user: createdUser._id,
        startDate: '04-24-2021',
        endDate: '04-24-2021',
        remainingNumber: 20,
        price: 2000,
      })
      .expect(({ body }) => {
        expect(body.price).toEqual(2000);
      });
  });

  it('should delete pass', async () => {
    return request(app.getHttpServer()).delete(`/pass/${fetchedPasses[0]._id}`).set('Accept', 'application/json').expect(200);
  });
});
