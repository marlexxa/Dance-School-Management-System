import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { database } from './constants';
import * as request from 'supertest';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { Role } from '../src/user/enums/role.enum';

export const PassTests = () => {
  describe('PASS', () => {
    let app: INestApplication;
    let createdUser;
    let fetchedPasses;

    const createUserDto: CreateUserDto = {
      name: 'JANUSZ',
      surname: 'GRZYWACZ',
      mail: 'jon.doe@mail.com',
      password: 'password',
      gender: 'male',
      role: [Role.Student],
    };

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
      await mongoose.connect(database);
      await mongoose.connection.db.dropDatabase();

      await request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json')
        .send(createUserDto)
        .expect(({ body }) => {
          createdUser = body;
        });
    });

    afterAll(async (done) => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect(done);
    });

    test('should create pass to existing user', async () => {
      return request(app.getHttpServer())
        .post('/passes')
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
          expect(body.user).toEqual(createdUser._id);
        });
    });

    test('should not create pass to not existing user', async () => {
      return request(app.getHttpServer())
        .post('/passes')
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

    test('should get allPasses', async () => {
      return request(app.getHttpServer())
        .get('/passes')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toEqual(1);
          fetchedPasses = body;
        });
    });

    test('should update pass', async () => {
      return request(app.getHttpServer())
        .put(`/passes/${fetchedPasses[0]._id}`)
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

    test('should delete pass', async () => {
      return request(app.getHttpServer()).delete(`/passes/${fetchedPasses[0]._id}`).set('Accept', 'application/json').expect(200);
    });
  });
};
