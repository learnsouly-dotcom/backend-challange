import { NoWhitespaceValidator } from './no-whitespace.validator';

describe('NoWhitespaceValidator', () => {
  const validator = new NoWhitespaceValidator();

  it('should return true for string without whitespace', () => {
    expect(validator.validate('abcdef')).toBe(true);
  });

  it('should return false for string with space', () => {
    expect(validator.validate('abc def')).toBe(false);
  });

  it('should return false for string with tab', () => {
    expect(validator.validate('abc\tdef')).toBe(false);
  });

  it('should return false for string with newline', () => {
    expect(validator.validate('abc\ndef')).toBe(false);
  });

  it('should return true for empty string', () => {
    expect(validator.validate('')).toBe(true);
  });
});
