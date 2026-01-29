import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cuisine' | 'price';
}

export default function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#FFF5F7] text-[#4A4A4A] border border-[#FDD5DD]/50',
    cuisine: 'bg-[#F8A5B8]/15 text-[#d4758a] font-semibold',
    price: 'bg-[#E8899C]/15 text-[#c46b7a] font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium tracking-wide ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
