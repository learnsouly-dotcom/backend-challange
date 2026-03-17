import { Injectable } from '@nestjs/common';
import { PasswordValidator } from './password-validator.interface.js';

@Injectable()
export class HasSpecialCharValidator implements PasswordValidator {
  validate(password: string): boolean {
    return /[!@#$%^&*()\-+]/.test(password);
  }
}
