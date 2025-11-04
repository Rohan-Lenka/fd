import { Test, TestingModule } from '@nestjs/testing';
import { UseraddressesController } from './useraddresses.controller';

describe('UseraddressesController', () => {
  let controller: UseraddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseraddressesController],
    }).compile();

    controller = module.get<UseraddressesController>(UseraddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
