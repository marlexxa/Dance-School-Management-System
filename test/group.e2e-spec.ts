import * as mongoose from 'mongoose';
import { database } from './constants';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';

// describe('GROUP', () => {
//   let app: INestApplication;
//   let groups;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   beforeAll(async () => {
//     await mongoose.connect(database);
//     await mongoose.connection.db.dropDatabase();
//   });

//   afterAll(async (done) => {
//     await mongoose.disconnect(done);
//   });

//   const createGroupDTOS: CreateGroupDto[] = [
//   ];
// }
