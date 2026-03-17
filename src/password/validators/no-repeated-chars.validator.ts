import { Injectable } from '@nestjs/common';
import { PasswordValidator } from './password-validator.interface.js';

@Injectable()
export class NoRepeatedCharsValidator implements PasswordValidator {
  validate(password: string): boolean {
    return new Set(password).size === password.length;
  }
}
