import { Injectable } from '@nestjs/common';
import { PasswordValidator } from './password-validator.interface.js';

@Injectable()
export class HasDigitValidator implements PasswordValidator {
  validate(password: string): boolean {
    return /[0-9]/.test(password);
  }
}
