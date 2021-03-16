import * as mongoose from 'mongoose';
import { database } from './constants';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AppModule } from '../src/app.module';
import { Role } from '../src/user/enums/role.enum';

export const DepositTest = () => {
  describe('DEPOSIT', () => {
    let app: INestApplication;
    let createdUser;
    let fetchedDeposits;

    const createUserDto: CreateUserDto = {
      name: 'JANINA',
      surname: 'Nowak',
      mail: 'janina.nowak@mail.com',
      password: 'password123',
      gender: 'female',
      role: [Role.Receptionist],
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

    it('should create deposit for user', async () => {
      return request(app.getHttpServer())
        .post('/deposits')
        .set('Accept', 'application/json')
        .send({
          user: createdUser._id,
          amount: 120,
          isPaid: true,
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body.user).toEqual(createdUser._id);
        });
    });

    it('should not create deposit to not existing user', async () => {
      return request(app.getHttpServer())
        .post('/deposits')
        .set('Accept', 'application/json')
        .send({
          user: '00000',
          amount: 30,
          isPaid: true,
        })
        .expect(500);
    });

    test('should get allDeposits', async () => {
      return request(app.getHttpServer())
        .get('/deposits')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toEqual(1);
          fetchedDeposits = body;
        });
    });

    test('should update deposit', async () => {
      return request(app.getHttpServer())
        .put(`/deposits/${fetchedDeposits[0]._id}`)
        .set('Accept', 'application/json')
        .send({
          user: createdUser._id,
          amount: 100,
          isPaid: false,
        })
        .expect(({ body }) => {
          expect(body.amount).toEqual(100);
        });
    });

    it('should delete last deposit', async () => {
      return request(app.getHttpServer()).delete(`/deposits/${fetchedDeposits[0]._id}`).set('Accept', 'application/json').expect(200);
    });
  });
};
