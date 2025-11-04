import { Test, TestingModule } from '@nestjs/testing';
import { MastercategoriesService } from './mastercategories.service';

describe('MastercategoriesService', () => {
  let service: MastercategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MastercategoriesService],
    }).compile();

    service = module.get<MastercategoriesService>(MastercategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
