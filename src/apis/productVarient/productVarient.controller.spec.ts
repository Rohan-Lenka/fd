import { Test, TestingModule } from '@nestjs/testing';
import { ProductVarientController } from './productVarient.controller';

describe('ProductVarientController', () => {
  let controller: ProductVarientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVarientController],
    }).compile();

    controller = module.get<ProductVarientController>(ProductVarientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
