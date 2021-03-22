import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { database } from './constants';
import * as request from 'supertest';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { CreateDepositDto } from '../src/deposit/dto/create-deposit.dto';
import { Role } from '../src/user/enums/role.enum';
import { Gender } from '../src/user/enums/gender.enum';
import { PaymentMethod } from '../src/payment/enums/paymentMethod.enum';

export const PaymentTests = () => {
  describe('PAYMENT', () => {
    let app: INestApplication;
    let createdUser;
    let createdDeposit;
    let fetchedPayments;

    const createUserDto: CreateUserDto = {
      name: 'John',
      surname: 'Doe',
      mail: 'jon.doe@mail.com',
      password: 'password',
      gender: Gender.Male,
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

      const CreateDepositDto: CreateDepositDto = {
        user: createdUser._id,
        amount: 100,
        isPaid: true,
      };

      await request(app.getHttpServer())
        .post('/deposits')
        .set('Accept', 'application/json')
        .send(CreateDepositDto)
        .expect(({ body }) => {
          createdDeposit = body;
        });
    });

    afterAll(async (done) => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect(done);
    });

    test('should create payment to existing user', async () => {
      return request(app.getHttpServer())
        .post('/payments')
        .set('Accept', 'application/json')
        .send({
          user: createdUser._id,
          paymentMethod: PaymentMethod.Card,
          deposit: [createdDeposit._id],
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body.user).toEqual(createdUser._id);
          expect(body.paymentMethod).toEqual('card');
          expect(body.deposit[0]).toEqual(createdDeposit._id);
        });
    });

    test('should not create payment to not existing user', async () => {
      return request(app.getHttpServer())
        .post('/payments')
        .set('Accept', 'application/json')
        .send({
          user: '60564e4e0e126a286befdc27',
          paymentMethod: 'card',
          deposit: [createdDeposit._id],
        })
        .expect(404);
    });

    test('should get all payments', async () => {
      return request(app.getHttpServer())
        .get('/payments')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toEqual(1);
          expect(body[0].user.name).toEqual('John');
          fetchedPayments = body;
        });
    });

    test('should get all payments for user', async () => {
      return request(app.getHttpServer())
        .get(`/payments/users/${createdUser._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body.length).toEqual(1);
          expect(body[0].paymentMethod).toEqual('card');
        });
    });

    test('should update payment', async () => {
      return request(app.getHttpServer())
        .put(`/payments/${fetchedPayments[0]._id}`)
        .set('Accept', 'application/json')
        .send({
          user: createdUser._id,
          paymentMethod: 'Bank Transfer',
          deposit: [createdDeposit._id],
        })
        .expect(({ body }) => {
          expect(body.paymentMethod).toEqual('Bank Transfer');
        });
    });

    test('should delete payment', async () => {
      return request(app.getHttpServer()).delete(`/payments/${fetchedPayments[0]._id}`).set('Accept', 'application/json').expect(200);
    });
  });
};
