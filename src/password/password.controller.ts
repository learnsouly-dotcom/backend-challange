import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PasswordService } from './password.service.js';
import { ValidatePasswordDto } from './dto/validate-password.dto.js';

@Controller('passwords')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('validate')
  @HttpCode(200)
  validate(@Body() dto: ValidatePasswordDto) {
    return this.passwordService.validate(dto.password);
  }
}
