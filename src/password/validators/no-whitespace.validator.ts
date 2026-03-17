import { Injectable } from '@nestjs/common';
import { PasswordValidator } from './password-validator.interface.js';

@Injectable()
export class NoWhitespaceValidator implements PasswordValidator {
  validate(password: string): boolean {
    return !/\s/.test(password);
  }
}
