export interface PasswordValidator {
  validate(password: string): boolean;
}

export const PASSWORD_VALIDATORS = 'PASSWORD_VALIDATORS';
