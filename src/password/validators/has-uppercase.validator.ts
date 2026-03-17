import { Injectable } from '@nestjs/common';
import { PasswordValidator } from './password-validator.interface.js';

@Injectable()
export class HasUppercaseValidator implements PasswordValidator {
  validate(password: string): boolean {
    return /[A-Z]/.test(password);
  }
}
