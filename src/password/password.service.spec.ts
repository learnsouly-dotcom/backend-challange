import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';
import {
  PASSWORD_VALIDATORS,
  PasswordValidator,
} from './validators/password-validator.interface';

class PassingValidator implements PasswordValidator {
  validate(): boolean {
    return true;
  }
}

class FailingValidator implements PasswordValidator {
  validate(): boolean {
    return false;
  }
}

describe('PasswordService', () => {
  const buildService = async (
    validators: PasswordValidator[],
  ): Promise<PasswordService> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        { provide: PASSWORD_VALIDATORS, useValue: validators },
      ],
    }).compile();

    return module.get(PasswordService);
  };

  it('should return isValid true with empty failedRules when all validators pass', async () => {
    const service = await buildService([
      new PassingValidator(),
      new PassingValidator(),
    ]);

    expect(service.validate('any')).toEqual({
      isValid: true,
      failedRules: [],
    });
  });

  it('should return isValid false with failedRules when a validator fails', async () => {
    const service = await buildService([
      new PassingValidator(),
      new FailingValidator(),
    ]);

    const result = service.validate('any');
    expect(result.isValid).toBe(false);
    expect(result.failedRules).toEqual(['Failing']);
  });

  it('should return isValid true with empty failedRules when validator list is empty', async () => {
    const service = await buildService([]);

    expect(service.validate('any')).toEqual({
      isValid: true,
      failedRules: [],
    });
  });
});
