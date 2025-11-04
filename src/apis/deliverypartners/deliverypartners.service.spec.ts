import { Test, TestingModule } from '@nestjs/testing';
import { DeliverypartnersService } from './deliverypartners.service';

describe('DeliverypartnersService', () => {
  let service: DeliverypartnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliverypartnersService],
    }).compile();

    service = module.get<DeliverypartnersService>(DeliverypartnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
