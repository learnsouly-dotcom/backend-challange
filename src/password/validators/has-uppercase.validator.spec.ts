import { HasUppercaseValidator } from './has-uppercase.validator';

describe('HasUppercaseValidator', () => {
  const validator = new HasUppercaseValidator();

  it('should return false for all lowercase', () => {
    expect(validator.validate('abcdef')).toBe(false);
  });

  it('should return true when uppercase is present', () => {
    expect(validator.validate('abcDef')).toBe(true);
  });

  it('should return false for empty string', () => {
    expect(validator.validate('')).toBe(false);
  });
});
