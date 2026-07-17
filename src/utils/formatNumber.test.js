import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  test('formats a number as USD currency with two decimal places', () => {
    expect(formatNumber(1234.5)).toBe('$1,234.50');
  });

  test('formats zero correctly', () => {
    expect(formatNumber(0)).toBe('$0.00');
  });
});
