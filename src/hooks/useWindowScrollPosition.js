import { useCallback, useLayoutEffect, useState } from 'react';

export const useWindowScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });
  const updatePosition = useCallback(() => {
    setScrollPosition({ x: window.scrollX, y: window.scrollY });
  }, []);
  useLayoutEffect(() => {
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [updatePosition]);
  return scrollPosition;
};
