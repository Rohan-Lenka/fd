import { Test, TestingModule } from '@nestjs/testing';
import { DeliverypartnersController } from './deliverypartners.controller';

describe('DeliverypartnersController', () => {
  let controller: DeliverypartnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverypartnersController],
    }).compile();

    controller = module.get<DeliverypartnersController>(
      DeliverypartnersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
