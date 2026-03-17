import { NoRepeatedCharsValidator } from './no-repeated-chars.validator';

describe('NoRepeatedCharsValidator', () => {
  const validator = new NoRepeatedCharsValidator();

  it('should return true for all unique characters', () => {
    expect(validator.validate('abcdef')).toBe(true);
  });

  it('should return false when a character is repeated', () => {
    expect(validator.validate('abcaef')).toBe(false);
  });

  it('should be case sensitive (a ≠ A)', () => {
    expect(validator.validate('aA')).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(validator.validate('')).toBe(true);
  });
});
