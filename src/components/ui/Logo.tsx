interface LogoProps {
  className?: string;
  size?: number;
}

/** Minimalistic pink outline burger icon */
function BurgerSVG({ size = 40, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top bun */}
      <path
        d="M12 28C12 18 20 10 32 10C44 10 52 18 52 28H12Z"
        stroke="#F8A5B8"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Sesame seeds */}
      <ellipse cx="26" cy="17" rx="2" ry="1.2" fill="#F8A5B8" />
      <ellipse cx="36" cy="15" rx="2" ry="1.2" fill="#F8A5B8" transform="rotate(-15 36 15)" />
      <ellipse cx="30" cy="22" rx="1.8" ry="1" fill="#F8A5B8" transform="rotate(10 30 22)" />
      {/* Lettuce (wavy) */}
      <path
        d="M10 32C14 29 18 34 22 31C26 28 30 34 34 31C38 28 42 34 46 31C50 28 54 33 54 32"
        stroke="#F8A5B8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cheese drip */}
      <path
        d="M10 36H54L52 36L48 40L44 36L40 36L36 42L32 36L28 36L24 39L20 36L16 36L12 40L10 36Z"
        stroke="#F8A5B8"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Patty */}
      <rect x="11" y="44" width="42" height="5" rx="2.5" stroke="#F8A5B8" strokeWidth="2.5" fill="none" />
      {/* Bottom bun */}
      <path
        d="M12 52H52C52 52 52 56 32 56C12 56 12 52 12 52Z"
        stroke="#F8A5B8"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}

/** Icon only */
export function LogoIcon({ size = 40, className }: LogoProps) {
  return <BurgerSVG size={size} className={className} />;
}

/** Full lockup: icon + "chloe eats" + "DFW" */
export function LogoFull({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BurgerSVG size={36} />
      <div className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold text-[#F8A5B8] tracking-tight">
          chloe eats
        </span>
        <span className="font-heading text-[10px] font-semibold text-[#E8919F] tracking-[0.3em] uppercase">
          DFW
        </span>
      </div>
    </div>
  );
}

/** Circle badge version for social/favicon */
export function LogoBadge({ size = 48, className = '' }: LogoProps) {
  return (
    <div
      className={`rounded-full bg-white border-2 border-[#F8A5B8] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <BurgerSVG size={size * 0.6} />
    </div>
  );
}
