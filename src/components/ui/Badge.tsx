import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cuisine' | 'price';
}

export default function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#FFF5F7] text-[#4A4A4A]',
    cuisine: 'bg-[#F8A5B8]/10 text-[#F8A5B8]',
    price: 'bg-[#E8899C]/10 text-[#E8899C]',
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
