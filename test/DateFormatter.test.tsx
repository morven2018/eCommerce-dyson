import { formatDate } from '../src/shared/utlis/date-utlis/date-formatter';
import { describe, it, expect } from 'vitest';

describe('formatDate', () => {
  it('should format date with single-digit month and day', () => {
    const date = new Date(2023, 0, 5);
    expect(formatDate(date)).toBe('2023-01-05');
  });

  it('should format date with double-digit month and day', () => {
    const date = new Date(2023, 10, 15);
    expect(formatDate(date)).toBe('2023-11-15');
  });

  it('should handle February 29th in leap year', () => {
    const date = new Date(2020, 1, 29);
    expect(formatDate(date)).toBe('2020-02-29');
  });

  it('should handle December 31st', () => {
    const date = new Date(2023, 11, 31);
    expect(formatDate(date)).toBe('2023-12-31');
  });

  it('should return correct format for minimum date', () => {
    const date = new Date(0);
    expect(formatDate(date)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should return correct format for current date', () => {
    const date = new Date();
    const result = formatDate(date);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should pad single-digit months and days with leading zeros', () => {
    const date = new Date(2023, 8, 7);
    const result = formatDate(date);
    expect(result).toBe('2023-09-07');
  });
});
