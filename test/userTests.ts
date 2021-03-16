import * as mongoose from 'mongoose';
import { database } from './constants';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Role } from '../src/user/enums/role.enum';
import { Gender } from '../src/user/enums/gender.enum';

export const UserTests = () => {
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
        gender: Gender.Male,
        role: [Role.Student],
      },
      {
        name: 'Jon2',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: Gender.Male,
        role: [Role.Student],
      },
      {
        name: 'Jon3',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: Gender.Male,
        role: [Role.Student],
      },
      {
        name: 'Jon4',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: Gender.Male,
        role: [Role.Student],
      },
      {
        name: 'Jon5',
        surname: 'Doe',
        mail: 'jon.doe@mail.com',
        password: 'password',
        gender: Gender.Male,
        role: [Role.Student],
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
            expect(body.gender).toEqual('male');
            expect(body.role).toEqual(['student']);
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
          role: Role.Student,
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
