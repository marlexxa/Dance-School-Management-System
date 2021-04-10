import * as mongoose from 'mongoose';
import { database } from './constants';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';

describe('SCHEDULE', () => {
  let app: INestApplication;
  let schedules;

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

  const createScheduleDTOS: CreateScheduleDto[] = [
    {
      lessons: ['1', '2'],
    },
    {
      lessons: ['3', '4'],
    },
    {
      lessons: ['5', '6'],
    },
    {
      lessons: ['7', '8'],
    },
    {
      lessons: ['9', '10'],
    },
  ];

  createScheduleDTOS.map((createScheduleDTO) => {
    it('should create schedule', async () => {
      return request(app.getHttpServer())
        .post('/schedule')
        .set('Accept', 'application/json')
        .send(createScheduleDTO)
        .expect(201)
        .expect(({ body }) => {
          //expect(body.lessons).toEqual(createScheduleDTO.lessons);
        });
    });
  });

  it('should get allSchedules', async () => {
    return request(app.getHttpServer())
      .get('/schedules')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toEqual(5);
        schedules = body;
      });
  });

  it('should find schedule by lessonId', async () => {
    return request(app.getHttpServer())
      .get(`lesson/${schedules[0].lessons[0]}`)
      .set('Accept', 'application/json')
      .expect(201)
      .expect(({ body }) => {
        expect(body.schedule.lessons).toContain(`${schedules[0].lessons[0]}`);
      });
  });

  it('should update first Schedule', async () => {
    return request(app.getHttpServer())
      .put(`/schedules/${schedules[0]._id}`)
      .set('Accept', 'application/json')
      .send({
        lesson: ['66', '77'],
      })
      .expect(({ body }) => {
        expect(body.lessons.toEqual(['66', '77']));
      });
  });

  it('should delete last Schedule', async () => {
    return request(app.getHttpServer())
      .delete(`/schedules/${schedules[schedules.length - 1]._id}`)
      .set('Accept', 'application/json')
      .expect(200);
  });
});
