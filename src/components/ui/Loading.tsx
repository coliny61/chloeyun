interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function Loading({ size = 'md', text }: LoadingProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizes[size]} animate-spin`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#FFF5F7"
            strokeWidth="3"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="#F8A5B8"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {text && <p className="text-[#4A4A4A] font-medium">{text}</p>}
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBFC]">
      <Loading size="lg" text="Loading delicious spots..." />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-[#FFF5F7]" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-[#FFF5F7] rounded w-3/4" />
        <div className="h-4 bg-[#FFF5F7] rounded w-1/2" />
        <div className="h-4 bg-[#FFF5F7] rounded w-full" />
      </div>
    </div>
  );
}
