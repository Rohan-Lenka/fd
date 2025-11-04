import { Test, TestingModule } from '@nestjs/testing';
import { MastercategoriesController } from './mastercategories.controller';

describe('MastercategoriesController', () => {
  let controller: MastercategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MastercategoriesController],
    }).compile();

    controller = module.get<MastercategoriesController>(
      MastercategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
