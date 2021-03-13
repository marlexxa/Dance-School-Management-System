import * as mongoose from 'mongoose';
import { database } from './constants';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

export const UserTest = () => {
  describe('USER', () => {
    let app: INestApplication;
    let users;
    let count = 0;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();

      await mongoose.connect(database);
      await mongoose.connection.db.dropDatabase();
    });

    afterAll(async (done) => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect(done);
    });

    const createUserDTOS: CreateUserDto[] = [
      {
        name: 'Jon1',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: 'male',
      },
      {
        name: 'Jon2',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: 'male',
      },
      {
        name: 'Jon3',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: 'male',
      },
      {
        name: 'Jon4',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: 'male',
      },
      {
        name: 'Jon5',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: 'male',
      },
    ];

    createUserDTOS.map((createUserDTO) => {
      test('should create user', async () => {
        count++;
        return request(app.getHttpServer())
          .post('/users')
          .set('Accept', 'application/json')
          .send(createUserDTO)
          .expect(201)
          .expect(({ body }) => {
            expect(body.name).toEqual(`Jon${count}`);
            expect(body.surname).toEqual('Doe');
            expect(body.password).toEqual('password');
            expect(body.surname).toEqual('Doe');
          });
      });
    });

    test('should get allUsers', async () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toEqual(5);
          users = body;
        });
    });

    test('should update first User', async () => {
      return request(app.getHttpServer())
        .put(`/users/${users[0]._id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Ben',
          surname: 'Kenobi',
          mail: 'ben@kenobi.pl',
          password: 'test',
          gender: 'male',
        })
        .expect(({ body }) => {
          expect(body.name).toEqual('Ben');
        });
    });

    test('should delete last User', async () => {
      return request(app.getHttpServer())
        .delete(`/users/${users[users.length - 1]._id}`)
        .set('Accept', 'application/json')
        .expect(200);
    });
  });
};
