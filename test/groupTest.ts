import * as mongoose from 'mongoose';
import { database } from './constants';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';

export const GroupTests = () => {
  describe('GROUP', () => {
    let app: INestApplication;

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

    const createGroupDTOS: CreateGroupDto[] = [
      {
        danceType: 'Jon2',
        advanceLevel: 'Doe',
        teachers: 'jon.doe@mail.com',
        students: 'password',
        maxAmount: 'male',
        schedule: 'male',
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

    createGroupDTOS.map((CreateGroupDto) => {
      test('should create group', async () => {
        count++;
        return request(app.getHttpServer())
          .post('/groups')
          .set('Accept', 'application/json')
          .send(CreateGroupDto)
          .expect(201)
          .expect(({ body }) => {
            expect(body.name).toEqual(`Jon${count}`);
            expect(body.surname).toEqual('Doe');
            expect(body.password).toEqual('password');
            expect(body.surname).toEqual('Doe');
          });
      });
    });

    test('should get all Groups', async () => {
      return request(app.getHttpServer())
        .get('/groups')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toEqual(5);
          groups = body;
        });
    });

    test('should update first Group', async () => {
      return request(app.getHttpServer())
        .put(`/groups/${groups[0]._id}`)
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

    test('should delete last Group', async () => {
      return request(app.getHttpServer())
        .delete(`/groups/${groups[users.length - 1]._id}`)
        .set('Accept', 'application/json')
        .expect(200);
    });
  });
};
