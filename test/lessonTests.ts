import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { database } from './constants';
import * as request from 'supertest';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
// import { CreateGroupDto } from '../src/group/dto/create-group.dto';

export const LessonTests = () => {
  describe('LESSON', () => {
    let app: INestApplication;
    let createdUser;
    // let createdGroup;
    let fetchedLessons;

    const createUserDto: CreateUserDto = {
      name: 'JANUSZ',
      surname: 'GRZYWACZ',
      mail: 'jon.doe@mail.com',
      password: 'password',
      gender: 'male',
    };

    // const createGroupDto: createGroupDto = {
    //   danceType: 'Salsa',
    //   advanceLevel: 'P1',
    //   teacher: '',
    //   student: '',
    //   maxAmount: '20',
    //   schedule: '1',
    // };

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

      // await request(app.getHttpServer())
      //   .post('/groups')
      //   .set('Accept', 'application/json')
      //   .send(createGroupDto)
      //   .expect(({ body }) => {
      //     createdGroup = body;
      //   });
    });

    afterAll(async (done) => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect(done);
    });

    test('should create lesson to existing user', async () => {
      return request(app.getHttpServer())
        .post('/lessons')
        .set('Accept', 'application/json')
        .send({
          date: '04-24-2021',
          teacher: createdUser._id,
          // group: createdGroup._id,
          student: createdUser._id,
          priceInCash: 20,
          startTime: '04-24-2021T10:00:00',
          endTime: '04-24-2021T12:00:00',
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body.user).toEqual(createdUser._id);
        });
    });

    test('should not create lesson to not existing date', async () => {
      return request(app.getHttpServer())
        .post('/lessons')
        .set('Accept', 'application/json')
        .send({
          date: '04-41-2021',
          teacher: createdUser._id,
          // group: createdGroup._id,
          student: createdUser._id,
          priceInCash: 20,
          startTime: '04-24-2021T10:00:00',
          endTime: '04-24-2021T12:00:00',
        })
        .expect(500);
    });

    test('should get all lessons', async () => {
      return request(app.getHttpServer())
        .get('/lessons')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toEqual(1);
          fetchedLessons = body;
        });
    });

    test('should update lesson', async () => {
      return request(app.getHttpServer())
        .put(`/lessons/${fetchedLessons[0]._id}`)
        .set('Accept', 'application/json')
        .send({
          date: '04-24-2021',
          teacher: createdUser._id,
          // group: createdGroup._id,
          student: createdUser._id,
          priceInCash: 20,
          startTime: '04-24-2021T10:00:00',
          endTime: '04-24-2021T13:00:00',
        })
        .expect(({ body }) => {
          expect(body.price).toEqual(2000);
        });
    });

    test('should delete lesson', async () => {
      return request(app.getHttpServer()).delete(`/lessons/${fetchedLessons[0]._id}`).set('Accept', 'application/json').expect(200);
    });
  });
};
