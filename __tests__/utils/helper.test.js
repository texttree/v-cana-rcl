import { truncateText } from 'src/utils';

// Runnable unit tests in javascript
test('truncateText should return the original text if its length is less than maxLength', () => {
  const result = truncateText('short text', 20);
  expect(result).toBe('short text');
});

test('truncateText should return the original text if its length is equal to maxLength', () => {
  const result = truncateText('equal length', 12);
  expect(result).toBe('equal length');
});

test('truncateText should return a truncated text with "..." if its length is greater than maxLength', () => {
  const result = truncateText('This is a long text', 10);
  expect(result).toBe('This is a ...');
});

test('truncateText should return the original text if maxLength is less than 0', () => {
  const result = truncateText('some text', -5);
  expect(result).toBe('some text');
});
