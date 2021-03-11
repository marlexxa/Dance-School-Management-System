import * as mongoose from 'mongoose';
import { database } from './constants';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateDepositDto } from 'src/deposit/dto/create-deposit.dto';

describe('DEPOSIT', () => {
  let app: INestApplication;
  let deposits;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await mongoose.connect(database);
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async (done) => {
    await mongoose.disconnect(done);
  });

  const createDepositDTOS: CreateDepositDto[] = [
    {
      userId: '1',
      amount: 200,
      isPaid: true,
    },
    {
      userId: '2',
      amount: 0,
      isPaid: false,
    },
    {
      userId: '3',
      amount: 20,
      isPaid: true,
    },
    {
      userId: '4',
      amount: 40,
      isPaid: true,
    },
    {
      userId: '5',
      amount: 150,
      isPaid: true,
    },
  ];

  createDepositDTOS.map((createDepositDTO) => {
    it('should create deposit', async () => {
      return request(app.getHttpServer())
        .post('/deposit')
        .set('Accept', 'application/json')
        .send(createDepositDTO)
        .expect(201)
        .expect(({ body }) => {
          expect(body.userId).toEqual(createDepositDTO.userId);
          expect(body.amount).toEqual(createDepositDTO.amount);
          expect(body.isPaid).toEqual(createDepositDTO.isPaid);
        });
    });
  });

  it('should get allDeposits', async () => {
    return request(app.getHttpServer())
      .get('/deposit')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(5);
        deposits = body;
      });
  });

  it('should update first deposit', async () => {
    return request(app.getHttpServer())
      .put(`/deposit/${deposits[0]._id}`)
      .set('Accept', 'application/json')
      .send({
        amount: 111,
        isPaid: true,
      })
      .expect(({ body }) => {
        expect(body.amount).toEqual(111);
        expect(body.isPaid).toEqual(true);
      });
  });

  it('should delete last deposit', async () => {
    return request(app.getHttpServer())
      .delete(`/deposit/${deposits[deposits.length - 1]._id}`)
      .set('Accept', 'application/json')
      .expect(200);
  });
});
