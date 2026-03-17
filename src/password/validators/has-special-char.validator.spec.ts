import { HasSpecialCharValidator } from './has-special-char.validator';

describe('HasSpecialCharValidator', () => {
  const validator = new HasSpecialCharValidator();

  it('should return false for alphanumeric only', () => {
    expect(validator.validate('abcdef')).toBe(false);
  });

  it.each(['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+'])(
    'should return true for special char "%s"',
    (char) => {
      expect(validator.validate(`abc${char}ef`)).toBe(true);
    },
  );

  it('should return false for underscore (not in the list)', () => {
    expect(validator.validate('abc_ef')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(validator.validate('')).toBe(false);
  });
});
