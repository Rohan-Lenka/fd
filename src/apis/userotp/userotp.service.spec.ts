import { Test, TestingModule } from '@nestjs/testing';
import { UserotpService } from './userotp.service';

describe('UserotpService', () => {
  let service: UserotpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserotpService],
    }).compile();

    service = module.get<UserotpService>(UserotpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
