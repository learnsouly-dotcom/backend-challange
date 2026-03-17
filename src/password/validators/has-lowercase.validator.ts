import { Injectable } from '@nestjs/common';
import { PasswordValidator } from './password-validator.interface.js';

@Injectable()
export class HasLowercaseValidator implements PasswordValidator {
  validate(password: string): boolean {
    return /[a-z]/.test(password);
  }
}
