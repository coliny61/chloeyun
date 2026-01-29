import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-semibold tracking-wide
      transition-all duration-300 ease-out
      rounded-full
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98]
    `;

    const variants = {
      primary: `
        bg-[#F8A5B8] text-white
        hover:bg-[#E8899C] hover:shadow-lg hover:-translate-y-0.5
        focus:ring-[#F8A5B8]
        shadow-md
      `,
      secondary: `
        bg-[#FDD5DD] text-[#4A4A4A]
        hover:bg-[#f5c8d0] hover:shadow-md hover:-translate-y-0.5
        focus:ring-[#FDD5DD]
      `,
      outline: `
        border-2 border-[#F8A5B8] text-[#F8A5B8]
        hover:bg-[#F8A5B8] hover:text-white hover:shadow-md hover:-translate-y-0.5
        focus:ring-[#F8A5B8]
        bg-white/80 backdrop-blur-sm
      `,
      ghost: `
        text-[#4A4A4A]
        hover:bg-[#FFF5F7] hover:text-[#E8899C]
        focus:ring-[#F8A5B8]
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
