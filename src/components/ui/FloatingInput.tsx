import { forwardRef, useState, useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

interface BaseFloatingProps {
  label: string;
  error?: string;
  success?: boolean;
}

type FloatingInputProps = BaseFloatingProps & InputHTMLAttributes<HTMLInputElement>;
type FloatingTextareaProps = BaseFloatingProps & TextareaHTMLAttributes<HTMLTextAreaElement>;
type FloatingSelectProps = BaseFloatingProps & SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
};

const baseWrapperClasses = 'relative';
const baseLabelClasses = `
  absolute left-4 transition-all duration-200 pointer-events-none
  text-[#4A4A4A]/60
`;
const baseInputClasses = `
  w-full px-4 py-4 pt-6 border-2 rounded-xl bg-white
  transition-all duration-200
  focus:outline-none focus:ring-0
`;

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, success, className = '', value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();
    const hasValue = value !== undefined && value !== '';
    const isActive = isFocused || hasValue;

    const borderClasses = error
      ? 'border-red-400 focus:border-red-500'
      : success
      ? 'border-green-400 focus:border-green-500'
      : 'border-[#FFF5F7] focus:border-[#F8A5B8]';

    return (
      <div className={baseWrapperClasses}>
        <input
          ref={ref}
          id={id}
          value={value}
          className={`
            ${baseInputClasses}
            ${borderClasses}
            ${error ? 'animate-shake' : ''}
            ${className}
          `}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className={`
            ${baseLabelClasses}
            ${isActive
              ? 'top-2 text-xs text-[#F8A5B8]'
              : 'top-1/2 -translate-y-1/2 text-base'
            }
          `}
        >
          {label}
        </label>
        {/* Success checkmark */}
        {success && !error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                className="animate-[checkmark-draw_0.3s_ease-out_forwards]"
                style={{
                  strokeDasharray: 20,
                  strokeDashoffset: 20,
                }}
              />
            </svg>
          </div>
        )}
        {/* Error message */}
        {error && (
          <p className="mt-1 text-sm text-red-500 animate-slide-up-fade">{error}</p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, success, className = '', value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();
    const hasValue = value !== undefined && value !== '';
    const isActive = isFocused || hasValue;

    const borderClasses = error
      ? 'border-red-400 focus:border-red-500'
      : success
      ? 'border-green-400 focus:border-green-500'
      : 'border-[#FFF5F7] focus:border-[#F8A5B8]';

    return (
      <div className={baseWrapperClasses}>
        <textarea
          ref={ref}
          id={id}
          value={value}
          className={`
            ${baseInputClasses}
            ${borderClasses}
            ${error ? 'animate-shake' : ''}
            resize-none min-h-[150px]
            ${className}
          `}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className={`
            ${baseLabelClasses}
            ${isActive
              ? 'top-2 text-xs text-[#F8A5B8]'
              : 'top-6 text-base'
            }
          `}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500 animate-slide-up-fade">{error}</p>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = 'FloatingTextarea';

export const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ label, error, success, className = '', value, children, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();
    const hasValue = value !== undefined && value !== '';
    const isActive = isFocused || hasValue;

    const borderClasses = error
      ? 'border-red-400 focus:border-red-500'
      : success
      ? 'border-green-400 focus:border-green-500'
      : 'border-[#FFF5F7] focus:border-[#F8A5B8]';

    return (
      <div className={baseWrapperClasses}>
        <select
          ref={ref}
          id={id}
          value={value}
          className={`
            ${baseInputClasses}
            ${borderClasses}
            appearance-none cursor-pointer
            ${className}
          `}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        >
          {children}
        </select>
        <label
          htmlFor={id}
          className={`
            ${baseLabelClasses}
            ${isActive
              ? 'top-2 text-xs text-[#F8A5B8]'
              : 'top-1/2 -translate-y-1/2 text-base'
            }
          `}
        >
          {label}
        </label>
        {/* Dropdown arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className={`w-5 h-5 text-[#4A4A4A]/60 transition-transform duration-200 ${isFocused ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500 animate-slide-up-fade">{error}</p>
        )}
      </div>
    );
  }
);

FloatingSelect.displayName = 'FloatingSelect';

export default FloatingInput;
