import { useState, useEffect } from 'react';

export function useCountUp(target: number, durationStr: number = 1000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const increment = target / (durationStr / 16); // roughly 60fps -> 16ms per frame

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start)); // Or Math.floor, ceil works well for count up
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, durationStr]);

  return count;
}
