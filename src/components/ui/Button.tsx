import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-[#F8A5B8] text-white hover:bg-[#E8899C] focus:ring-[#F8A5B8]',
      secondary: 'bg-[#FDD5DD] text-[#4A4A4A] hover:bg-[#FFE085] focus:ring-[#FDD5DD]',
      outline: 'border-2 border-[#F8A5B8] text-[#F8A5B8] hover:bg-[#F8A5B8] hover:text-white focus:ring-[#F8A5B8]',
      ghost: 'text-[#4A4A4A] hover:bg-[#FFF5F7] focus:ring-[#F8A5B8]',
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
