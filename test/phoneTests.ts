/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { database } from './constants';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import * as request from 'supertest';
export const PhoneTest = () => {
  describe('PHONE', () => {
    let app: INestApplication;
    let createdUser;
    let fetchedPhones;

    afterAll(async (done) => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect(done);
    });
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

    it('should create phone to existing user', async () => {
      return request(app.getHttpServer())
        .post('/phones')
        .set('Accept', 'application/json')
        .send({
          user: createdUser._id,
          phoneNumber: '123456789',
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body.user).toEqual(createdUser._id);
        });
    });

    it('should not create pass to not existing user', async () => {
      return request(app.getHttpServer())
        .post('/phones')
        .set('Accept', 'application/json')
        .send({
          user: 'someVALUE',
          phoneNumber: '123456789',
        })
        .expect(500);
    });

    it('should get allPhones', async () => {
      return request(app.getHttpServer())
        .get('/phones')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toEqual(1);
          fetchedPhones = body;
        });
    });

    it('should update phone', async () => {
      return request(app.getHttpServer())
        .put(`/phones/${fetchedPhones[0]._id}`)
        .set('Accept', 'application/json')
        .send({
          user: createdUser._id,
          phoneNumber: '111111111',
        })
        .expect(({ body }) => {
          expect(body.phoneNumber).toEqual('111111111');
        });
    });

    it('should delete phone', async () => {
      return request(app.getHttpServer()).delete(`/phones/${fetchedPhones[0]._id}`).set('Accept', 'application/json').expect(200);
    });
  });
};
