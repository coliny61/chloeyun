import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export default function Rating({ value, max = 5, size = 'md', showValue = false }: RatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} className={`${sizes[size]} text-[#FFEAA7]`} />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <StarOutlineIcon className={`${sizes[size]} text-[#FFEAA7]`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className={`${sizes[size]} text-[#FFEAA7]`} />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOutlineIcon key={`empty-${i}`} className={`${sizes[size]} text-[#FFEAA7]`} />
        ))}
      </div>

      {showValue && (
        <span className="text-[#6B5B5B] font-medium ml-1">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
