import { forwardRef } from 'react';

type DividerVariant = 'wave' | 'curve' | 'angle' | 'layered';
type DividerPosition = 'top' | 'bottom';

interface SectionDividerProps {
  variant?: DividerVariant;
  position?: DividerPosition;
  fillColor?: string;
  className?: string;
  height?: number;
}

/**
 * SectionDivider - SVG-based smooth transitions between sections
 */
const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  (
    {
      variant = 'wave',
      position = 'bottom',
      fillColor = '#FFFFFF',
      className = '',
      height = 80,
    },
    ref
  ) => {
    const isFlipped = position === 'top';

    const renderPath = () => {
      switch (variant) {
        case 'wave':
          return (
            <path
              d="M0,32 C150,96 350,0 500,32 C650,64 850,0 1000,32 L1000,100 L0,100 Z"
              fill={fillColor}
            />
          );
        case 'curve':
          return (
            <path
              d="M0,64 Q250,0 500,64 T1000,64 L1000,100 L0,100 Z"
              fill={fillColor}
            />
          );
        case 'angle':
          return (
            <polygon
              points="0,100 1000,0 1000,100"
              fill={fillColor}
            />
          );
        case 'layered':
          return (
            <>
              <path
                d="M0,50 C200,20 400,80 600,50 C800,20 1000,80 1000,50 L1000,100 L0,100 Z"
                fill={fillColor}
                opacity="0.5"
              />
              <path
                d="M0,70 C300,40 500,90 700,60 C900,30 1000,70 1000,70 L1000,100 L0,100 Z"
                fill={fillColor}
              />
            </>
          );
        default:
          return (
            <path
              d="M0,32 C150,96 350,0 500,32 C650,64 850,0 1000,32 L1000,100 L0,100 Z"
              fill={fillColor}
            />
          );
      }
    };

    return (
      <div
        ref={ref}
        className={`w-full overflow-hidden leading-[0] ${className}`}
        style={{
          height: `${height}px`,
          marginTop: isFlipped ? 0 : `-${height}px`,
          marginBottom: isFlipped ? `-${height}px` : 0,
          transform: isFlipped ? 'rotate(180deg)' : undefined,
        }}
      >
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {renderPath()}
        </svg>
      </div>
    );
  }
);

SectionDivider.displayName = 'SectionDivider';

/**
 * Pre-configured dividers for common use cases
 */
export const WaveDivider = (props: Omit<SectionDividerProps, 'variant'>) => (
  <SectionDivider variant="wave" {...props} />
);

export const CurveDivider = (props: Omit<SectionDividerProps, 'variant'>) => (
  <SectionDivider variant="curve" {...props} />
);

export const AngleDivider = (props: Omit<SectionDividerProps, 'variant'>) => (
  <SectionDivider variant="angle" {...props} />
);

export const LayeredDivider = (props: Omit<SectionDividerProps, 'variant'>) => (
  <SectionDivider variant="layered" {...props} />
);

export default SectionDivider;
