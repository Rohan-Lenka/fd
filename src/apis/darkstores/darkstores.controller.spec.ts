import { Test, TestingModule } from '@nestjs/testing';
import { DarkstoresController } from './darkstores.controller';

describe('DarkstoresController', () => {
  let controller: DarkstoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DarkstoresController],
    }).compile();

    controller = module.get<DarkstoresController>(DarkstoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
