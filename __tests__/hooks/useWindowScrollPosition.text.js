import { renderHook, act } from '@testing-library/react';
import { useWindowScrollPosition } from 'src/hooks';

// Mock function for window.scrollTo
global.scrollTo = jest.fn((x, y) => {
  Object.defineProperty(window, 'scrollX', { value: x, writable: true });
  Object.defineProperty(window, 'scrollY', { value: y, writable: true });
  window.dispatchEvent(new Event('scroll'));
});

describe('useWindowScrollPosition Test', () => {
  test('initial scroll position is {x: 0, y: 0}', () => {
    const { result } = renderHook(() => useWindowScrollPosition());
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  test('scroll position updates correctly after scrolling', () => {
    const { result } = renderHook(() => useWindowScrollPosition());
    expect(result.current).toEqual({ x: 0, y: 0 });

    act(() => {
      window.scrollTo(100, 200);
    });

    expect(result.current).toEqual({ x: 100, y: 200 });
  });

  test('scroll event listener is added and removed properly', () => {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    const { unmount } = renderHook(() => useWindowScrollPosition());
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
