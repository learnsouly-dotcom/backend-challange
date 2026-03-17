import { Module } from '@nestjs/common';
import { PASSWORD_VALIDATORS } from './validators/password-validator.interface.js';
import { MinLengthValidator } from './validators/min-length.validator.js';
import { HasDigitValidator } from './validators/has-digit.validator.js';
import { HasLowercaseValidator } from './validators/has-lowercase.validator.js';
import { HasUppercaseValidator } from './validators/has-uppercase.validator.js';
import { HasSpecialCharValidator } from './validators/has-special-char.validator.js';
import { NoRepeatedCharsValidator } from './validators/no-repeated-chars.validator.js';
import { NoWhitespaceValidator } from './validators/no-whitespace.validator.js';
import { PasswordService } from './password.service.js';
import { PasswordController } from './password.controller.js';

@Module({
  controllers: [PasswordController],
  providers: [
    MinLengthValidator,
    HasDigitValidator,
    HasLowercaseValidator,
    HasUppercaseValidator,
    HasSpecialCharValidator,
    NoRepeatedCharsValidator,
    NoWhitespaceValidator,
    {
      provide: PASSWORD_VALIDATORS,
      useFactory: (
        minLength: MinLengthValidator,
        hasDigit: HasDigitValidator,
        hasLowercase: HasLowercaseValidator,
        hasUppercase: HasUppercaseValidator,
        hasSpecialChar: HasSpecialCharValidator,
        noRepeatedChars: NoRepeatedCharsValidator,
        noWhitespace: NoWhitespaceValidator,
      ) => [
        minLength,
        hasDigit,
        hasLowercase,
        hasUppercase,
        hasSpecialChar,
        noRepeatedChars,
        noWhitespace,
      ],
      inject: [
        MinLengthValidator,
        HasDigitValidator,
        HasLowercaseValidator,
        HasUppercaseValidator,
        HasSpecialCharValidator,
        NoRepeatedCharsValidator,
        NoWhitespaceValidator,
      ],
    },
    PasswordService,
  ],
})
export class PasswordModule {}
