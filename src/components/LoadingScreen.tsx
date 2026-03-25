import { useEffect, useState } from 'react';
import { LogoIcon } from './ui/Logo';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LoadingScreenProps {
  onFinished?: () => void;
  minDuration?: number;
}

export default function LoadingScreen({ onFinished, minDuration = 800 }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      if (onFinished) {
        setTimeout(onFinished, prefersReducedMotion ? 0 : 400);
      }
    }, prefersReducedMotion ? 0 : minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onFinished, prefersReducedMotion]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF6F0] transition-opacity duration-400 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className={prefersReducedMotion ? '' : 'animate-bounce-in'}>
        <LogoIcon size={72} />
      </div>
      <p className="mt-4 font-heading text-lg font-semibold text-[#F8A5B8]">
        chloe eats <span className="text-[#E8919F]">DFW</span>
      </p>
      {!prefersReducedMotion && (
        <div className="mt-6 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#F8A5B8] animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
