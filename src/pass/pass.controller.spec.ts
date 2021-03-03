import { Test, TestingModule } from '@nestjs/testing';
import { PassController } from './pass.controller';
import { PassService } from './pass.service';

describe('PassController', () => {
  let controller: PassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassController],
      providers: [PassService],
    }).compile();

    controller = module.get<PassController>(PassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
