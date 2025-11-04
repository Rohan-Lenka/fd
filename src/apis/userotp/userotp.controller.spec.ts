import { Test, TestingModule } from '@nestjs/testing';
import { UserotpController } from './userotp.controller';

describe('UserotpController', () => {
  let controller: UserotpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserotpController],
    }).compile();

    controller = module.get<UserotpController>(UserotpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
