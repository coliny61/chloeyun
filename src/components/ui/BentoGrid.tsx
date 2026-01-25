import { forwardRef } from 'react';
import type { ReactNode } from 'react';

type BentoSize = 'sm' | 'md' | 'lg' | 'wide' | 'tall';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}

interface BentoItemProps {
  children: ReactNode;
  size?: BentoSize;
  className?: string;
  index?: number;
  isVisible?: boolean;
}

/**
 * BentoGrid - A modern grid layout with varied item sizes
 *
 * Layout pattern (3 columns):
 * +-------+-------+-------+
 * |       |   2   |   3   |
 * |   1   +-------+-------+
 * | tall  |      4 wide   |
 * +-------+---------------+
 */
export function BentoGrid({ children, className = '', columns = 3 }: BentoGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={`grid grid-cols-1 ${gridCols[columns]} gap-4 lg:gap-6 auto-rows-[minmax(200px,auto)] ${className}`}
    >
      {children}
    </div>
  );
}

export const BentoItem = forwardRef<HTMLDivElement, BentoItemProps>(
  ({ children, size = 'md', className = '', index = 0, isVisible = true }, ref) => {
    // Size variants for grid span
    const sizeClasses: Record<BentoSize, string> = {
      sm: '',
      md: '',
      lg: 'md:col-span-2 md:row-span-2',
      wide: 'md:col-span-2',
      tall: 'md:row-span-2',
    };

    // Stagger delay based on index
    const delay = index * 100;

    return (
      <div
        ref={ref}
        className={`
          ${sizeClasses[size]}
          ${isVisible ? 'animate-slide-up-fade' : 'opacity-0'}
          ${className}
        `}
        style={{
          animationDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    );
  }
);

BentoItem.displayName = 'BentoItem';

export default BentoGrid;
