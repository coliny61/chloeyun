import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  shouldStart?: boolean;
}

interface UseCounterReturn {
  value: string;
  isComplete: boolean;
}

// Easing function: easeOutExpo for smooth deceleration
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Hook for animated number counters using requestAnimationFrame
 * Respects user's reduced motion preference
 */
export function useCounter(options: UseCounterOptions): UseCounterReturn {
  const {
    start = 0,
    end,
    duration = 2000,
    delay = 0,
    suffix = '',
    prefix = '',
    decimals = 0,
    shouldStart = true,
  } = options;

  const [value, setValue] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const formatValue = useCallback(
    (num: number): string => {
      const formatted = decimals > 0
        ? num.toFixed(decimals)
        : Math.round(num).toLocaleString();
      return `${prefix}${formatted}${suffix}`;
    },
    [prefix, suffix, decimals]
  );

  useEffect(() => {
    if (!shouldStart) {
      setValue(start);
      setIsComplete(false);
      return;
    }

    // If reduced motion is preferred, show final value immediately
    if (prefersReducedMotion) {
      setValue(end);
      setIsComplete(true);
      return;
    }

    const delayTimeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const currentValue = start + (end - start) * easedProgress;

        setValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setValue(end);
          setIsComplete(true);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    };
  }, [start, end, duration, delay, shouldStart, prefersReducedMotion]);

  return {
    value: formatValue(value),
    isComplete,
  };
}

export default useCounter;
