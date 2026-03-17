import { HasLowercaseValidator } from './has-lowercase.validator';

describe('HasLowercaseValidator', () => {
  const validator = new HasLowercaseValidator();

  it('should return false for all uppercase', () => {
    expect(validator.validate('ABCDEF')).toBe(false);
  });

  it('should return true when lowercase is present', () => {
    expect(validator.validate('ABCdEF')).toBe(true);
  });

  it('should return false for empty string', () => {
    expect(validator.validate('')).toBe(false);
  });
});
