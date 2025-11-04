import { Test, TestingModule } from '@nestjs/testing';
import { DarkstoresService } from './darkstores.service';

describe('DarkstoresService', () => {
  let service: DarkstoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DarkstoresService],
    }).compile();

    service = module.get<DarkstoresService>(DarkstoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
