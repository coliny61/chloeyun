import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

type CardVariant = 'default' | 'featured' | 'highlight' | 'minimal';
type HoverEffect = 'lift' | 'glow' | 'border' | 'scale' | 'none';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: CardVariant;
  hoverEffect?: HoverEffect;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover = false, variant = 'default', hoverEffect = 'lift', children, ...props }, ref) => {
    // Base styles that all cards share
    const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';

    // Variant styles
    const variantStyles: Record<CardVariant, string> = {
      default: 'bg-white shadow-md',
      featured: 'bg-white shadow-lg relative',
      highlight: 'bg-gradient-to-br from-[#FFF5F7] to-white shadow-md border border-[#F8A5B8]/20',
      minimal: 'bg-white/80 backdrop-blur-sm shadow-sm',
    };

    // Hover effect styles (only applied when hover is true)
    const hoverStyles: Record<HoverEffect, string> = {
      lift: 'hover:shadow-xl hover:-translate-y-1',
      glow: 'hover:shadow-[0_0_30px_rgba(248,165,184,0.4)]',
      border: 'hover-border-gradient',
      scale: 'hover:scale-[1.02] hover:shadow-xl',
      none: '',
    };

    return (
      <div
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${hover ? hoverStyles[hoverEffect] : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export const CardImage = ({ src, alt, className = '', overlay = false }: CardImageProps) => (
  <div className={`relative overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    {overlay && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    )}
  </div>
);

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent = ({ className = '', children }: CardContentProps) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4';
}

export const CardTitle = ({ className = '', children, as: Tag = 'h3' }: CardTitleProps) => (
  <Tag className={`font-heading text-xl font-semibold text-[#4A4A4A] ${className}`}>{children}</Tag>
);

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription = ({ className = '', children }: CardDescriptionProps) => (
  <p className={`text-[#4A4A4A]/70 text-sm mt-1 ${className}`}>{children}</p>
);

// Animated card wrapper for staggered animations
interface AnimatedCardProps extends CardProps {
  index?: number;
  isVisible?: boolean;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ index = 0, isVisible = true, className = '', ...props }, ref) => {
    return (
      <div
        className={`${isVisible ? 'animate-slide-up-fade' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <Card ref={ref} className={className} {...props} />
      </div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

export default Card;
