import { Test, TestingModule } from '@nestjs/testing';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

describe('PasswordController', () => {
  let controller: PasswordController;
  let service: jest.Mocked<PasswordService>;

  beforeEach(async () => {
    const mockService = {
      validate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordController],
      providers: [{ provide: PasswordService, useValue: mockService }],
    }).compile();

    controller = module.get(PasswordController);
    service = module.get(PasswordService);
  });

  it('should return the result from the service', () => {
    const expected = { isValid: true, failedRules: [] as string[] };
    service.validate.mockReturnValue(expected);

    const result = controller.validate({ password: 'AbTp9!fok' });

    expect(result).toEqual(expected);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.validate).toHaveBeenCalledWith('AbTp9!fok');
  });

  it('should pass the password from DTO to the service', () => {
    const expected = { isValid: false, failedRules: ['MinLength'] };
    service.validate.mockReturnValue(expected);

    const result = controller.validate({ password: 'ab' });

    expect(result).toEqual(expected);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.validate).toHaveBeenCalledWith('ab');
  });
});
