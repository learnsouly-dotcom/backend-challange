import { Injectable } from '@nestjs/common';
import { PasswordValidator } from './password-validator.interface.js';

@Injectable()
export class MinLengthValidator implements PasswordValidator {
  validate(password: string): boolean {
    return password.length >= 9;
  }
}
