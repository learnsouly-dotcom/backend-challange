import { MinLengthValidator } from './min-length.validator';

describe('MinLengthValidator', () => {
  const validator = new MinLengthValidator();

  it('should return false for empty string', () => {
    expect(validator.validate('')).toBe(false);
  });

  it('should return false for 8 characters', () => {
    expect(validator.validate('abcdefgh')).toBe(false);
  });

  it('should return true for 9 characters', () => {
    expect(validator.validate('abcdefghi')).toBe(true);
  });

  it('should return true for 10 characters', () => {
    expect(validator.validate('abcdefghij')).toBe(true);
  });
});
