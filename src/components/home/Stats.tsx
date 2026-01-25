import { mockStats } from '../../lib/mockData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCounter } from '../../hooks/useCounter';
import { getStaggerStyle } from '../../hooks/useStaggeredAnimation';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  index: number;
  shouldAnimate: boolean;
}

function StatItem({ value, suffix, label, index, shouldAnimate }: StatItemProps) {
  const { value: animatedValue } = useCounter({
    end: value,
    duration: 2000,
    delay: index * 150,
    suffix,
    shouldStart: shouldAnimate,
  });

  const staggerStyle = getStaggerStyle(index, 0, 150);

  return (
    <div
      className={`text-center relative ${
        shouldAnimate ? 'animate-slide-up-fade' : 'opacity-0'
      }`}
      style={staggerStyle}
    >
      {/* Decorative circle behind stat */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24 rounded-full bg-white/10 animate-float" style={{ animationDelay: `${index * 200}ms` }} />
      </div>

      <div className="relative z-10">
        <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          {animatedValue}
        </p>
        <p className="mt-3 text-white/90 text-sm sm:text-base font-medium">
          {label}
        </p>
      </div>
    </div>
  );
}

// Parse the stat values from the mock data
function parseStatValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^([\d.]+)([KMB+%]*)/);
  if (match) {
    return {
      number: parseFloat(match[1]),
      suffix: match[2] || '',
    };
  }
  return { number: 0, suffix: '' };
}

const stats = [
  {
    label: 'TikTok Followers',
    ...parseStatValue(mockStats.tikTokFollowers),
  },
  {
    label: 'TikTok Likes',
    ...parseStatValue(mockStats.tikTokLikes),
  },
  {
    label: 'Views in 2025',
    ...parseStatValue(mockStats.viewsThisYear),
  },
  {
    label: 'Cities Covered',
    number: mockStats.citiesCovered,
    suffix: '+',
  },
];

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-r from-[#F8A5B8] via-[#E8899C] to-[#F8A5B8] relative overflow-hidden"
    >
      {/* Decorative floating blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-12 ${
            isVisible ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Growing Community
          </h2>
          <p className="mt-2 text-white/80 text-sm sm:text-base">
            Join thousands of food lovers discovering DFW's best spots
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
              shouldAnimate={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
