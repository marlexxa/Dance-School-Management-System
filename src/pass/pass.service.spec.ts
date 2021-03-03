import { Test, TestingModule } from '@nestjs/testing';
import { PassService } from './pass.service';

describe('PassService', () => {
  let service: PassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassService],
    }).compile();

    service = module.get<PassService>(PassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
