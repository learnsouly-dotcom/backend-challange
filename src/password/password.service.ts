import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  PASSWORD_VALIDATORS,
  PasswordValidator,
} from './validators/password-validator.interface.js';
import { getRequestId } from '../common/context/request-context.js';

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);
  private readonly validators: PasswordValidator[];

  constructor(
    @Inject(PASSWORD_VALIDATORS)
    validators: PasswordValidator[],
  ) {
    this.validators = validators;
  }

  validate(password: string): { isValid: boolean; failedRules: string[] } {
    const failedValidators = this.validators.filter(
      (v) => !v.validate(password),
    );

    const failedRules = failedValidators.map((v) =>
      v.constructor.name.replace('Validator', ''),
    );

    if (failedRules.length > 0) {
      this.logger.warn(
        `[req:${getRequestId()}] Password validation failed: rules=[${failedRules.join(', ')}]`,
      );
    }

    return { isValid: failedRules.length === 0, failedRules };
  }
}
