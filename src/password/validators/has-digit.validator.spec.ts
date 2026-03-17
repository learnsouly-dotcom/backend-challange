import { HasDigitValidator } from './has-digit.validator';

describe('HasDigitValidator', () => {
  const validator = new HasDigitValidator();

  it('should return false for string without digits', () => {
    expect(validator.validate('abcdef')).toBe(false);
  });

  it('should return true for string with a digit', () => {
    expect(validator.validate('abc1ef')).toBe(true);
  });

  it('should return false for empty string', () => {
    expect(validator.validate('')).toBe(false);
  });
});
