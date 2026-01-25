import { useMemo } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseStaggeredAnimationOptions {
  itemCount: number;
  baseDelay?: number;
  staggerDelay?: number;
}

interface StaggeredItem {
  index: number;
  delay: number;
  style: React.CSSProperties;
}

/**
 * Hook for calculating staggered animation delays
 * Respects user's reduced motion preference
 */
export function useStaggeredAnimation(
  options: UseStaggeredAnimationOptions
): StaggeredItem[] {
  const { itemCount, baseDelay = 0, staggerDelay = 100 } = options;
  const prefersReducedMotion = useReducedMotion();

  const items = useMemo(() => {
    return Array.from({ length: itemCount }, (_, index) => {
      const delay = prefersReducedMotion ? 0 : baseDelay + index * staggerDelay;

      return {
        index,
        delay,
        style: {
          animationDelay: `${delay}ms`,
          transitionDelay: `${delay}ms`,
        } as React.CSSProperties,
      };
    });
  }, [itemCount, baseDelay, staggerDelay, prefersReducedMotion]);

  return items;
}

/**
 * Helper function to get stagger delay for a specific index
 */
export function getStaggerDelay(
  index: number,
  baseDelay = 0,
  staggerDelay = 100
): number {
  return baseDelay + index * staggerDelay;
}

/**
 * Helper function to get stagger style for a specific index
 */
export function getStaggerStyle(
  index: number,
  baseDelay = 0,
  staggerDelay = 100
): React.CSSProperties {
  const delay = baseDelay + index * staggerDelay;
  return {
    animationDelay: `${delay}ms`,
    transitionDelay: `${delay}ms`,
  };
}

export default useStaggeredAnimation;
