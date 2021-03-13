import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { database } from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { RoleType } from '../src/role/enum/role.enum';
import { CreateUserDto } from '../src/user/dto/create-user.dto';

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect(done);
});

describe('ROLE', () => {
  let app: INestApplication;
  let createdUser;
  let fetchedRoles;

  const createUserDto: CreateUserDto = {
    name: 'Zenek',
    surname: 'Martyniuk',
    mail: 'zenon@mail.com',
    password: 'oczyzielone',
    gender: 'male',
  };

  beforeEach(async () => {
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

  it('should create role if user exist', async () => {
    return request(app.getHttpServer())
      .post('/roles')
      .set('Accept', 'application/json')
      .send({
        roleType: 'STUDENT', //lowercase:true in RoleSchema changes it to lowercase so it fits with enum elements
        user: createdUser._id,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.user).toEqual(createdUser._id);
        expect(body.roleType).toEqual(RoleType.Student);
      });
  });

  it('should not create role if user does not exist', async () => {
    return request(app.getHttpServer())
      .post('/roles')
      .set('Accept', 'application/json')
      .send({
        roleType: RoleType.Teacher,
        user: 'bratZenka',
      })
      .expect(500);
  });

  it('should not create role if roleType differs from enum', async () => {
    return request(app.getHttpServer())
      .post('/roles')
      .set('Accept', 'application/json')
      .send({
        roleType: 'dreamer',
        user: createdUser._id,
      })
      .expect(500);
  });

  it('should get all roles', async () => {
    return request(app.getHttpServer())
      .get('/roles')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        fetchedRoles = body;
      });
  });

  it('should update role', async () => {
    return request(app.getHttpServer())
      .put(`/roles/${fetchedRoles[0]._id}`)
      .set('Accept', 'application/json')
      .send({
        roleType: RoleType.Admin,
        user: createdUser._id,
      })
      .expect(({ body }) => {
        expect(body.roleType).toEqual(RoleType.Admin);
      });
  });

  it('should delete role', async () => {
    return request(app.getHttpServer()).delete(`/roles/${fetchedRoles[0]._id}`).set('Accept', 'application/json').expect(200);
  });

  it('should delete created user', async () => {
    return request(app.getHttpServer()).delete(`/user/${createdUser._id}`).set('Accept', 'application/json').expect(200);
  });
});
