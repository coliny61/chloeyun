import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cuisine' | 'price';
}

export default function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#FFF9E6] text-[#6B5B5B]',
    cuisine: 'bg-[#FF6B6B]/10 text-[#FF6B6B]',
    price: 'bg-[#E07A5F]/10 text-[#E07A5F]',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
