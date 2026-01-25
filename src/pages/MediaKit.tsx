import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BentoGrid, BentoItem } from '../components/ui/BentoGrid';

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
  shouldAnimate: boolean;
  delay?: number;
}

function AnimatedStat({ value, suffix, label, shouldAnimate, delay = 0 }: AnimatedStatProps) {
  const { value: animatedValue } = useCounter({
    end: value,
    duration: 2000,
    delay,
    suffix,
    shouldStart: shouldAnimate,
  });

  return (
    <div className="text-center p-6 bg-[#FFF5F7] rounded-2xl">
      <p className="font-heading text-4xl font-bold text-[#F8A5B8]">{animatedValue}</p>
      <p className="text-[#4A4A4A] mt-2">{label}</p>
    </div>
  );
}

interface AnimatedProgressBarProps {
  label: string;
  percentage: number;
  shouldAnimate: boolean;
  delay?: number;
}

function AnimatedProgressBar({ label, percentage, shouldAnimate, delay = 0 }: AnimatedProgressBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setWidth(0);
      return;
    }
    if (prefersReducedMotion) {
      setWidth(percentage);
      return;
    }

    const timer = setTimeout(() => {
      setWidth(percentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [shouldAnimate, percentage, delay, prefersReducedMotion]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-[#4A4A4A] font-medium">{label}</span>
        <span className="text-[#F8A5B8] font-semibold">{percentage}%</span>
      </div>
      <div className="h-3 bg-[#FFF5F7] rounded-full overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-[#F8A5B8] to-[#E8899C] rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

const services = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#F8A5B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'UGC Content Creation',
    description: 'High-quality, authentic video content for your brand\'s social media, ads, or website. Engaging storytelling that resonates with food lovers.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#F8A5B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: 'Restaurant Features',
    description: 'Dedicated TikTok and Instagram content showcasing your restaurant, menu highlights, and dining experience to my engaged DFW audience.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#F8A5B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Event Coverage',
    description: 'Live event coverage, grand openings, tastings, and special occasions. Capture the energy and excitement of your event.',
  },
];

const brands = ['Mamani', "Norman's Japanese", 'Tatsu Dallas', 'Written by the Seasons', 'Pillar', 'NADC Burger', 'Big Dash', 'Balloon Museum'];

export default function MediaKit() {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { ref: statsRef, isVisible: isStatsVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: servicesRef, isVisible: isServicesVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: audienceRef, isVisible: isAudienceVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: brandsRef, isVisible: isBrandsVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-[#FFFBFC] pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5F7] to-[#FDD5DD] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8A5B8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1
            className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4A4A4A] transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Media Kit
          </h1>
          <p
            className={`mt-6 text-xl text-[#4A4A4A]/80 max-w-2xl mx-auto transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Let's create something amazing together. Here's everything you need to know about partnering with Chloe Eats DFW.
          </p>
        </div>
      </section>

      {/* Stats Section with Bento Grid */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`font-heading text-3xl font-bold text-[#4A4A4A] text-center mb-12 transition-all duration-700 ${
              isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            By The Numbers
          </h2>
          <BentoGrid columns={4}>
            <BentoItem index={0} isVisible={isStatsVisible}>
              <AnimatedStat value={27} suffix="K+" label="TikTok Followers" shouldAnimate={isStatsVisible} delay={0} />
            </BentoItem>
            <BentoItem index={1} isVisible={isStatsVisible}>
              <AnimatedStat value={1.6} suffix="M+" label="TikTok Likes" shouldAnimate={isStatsVisible} delay={100} />
            </BentoItem>
            <BentoItem index={2} isVisible={isStatsVisible}>
              <AnimatedStat value={2.8} suffix="M+" label="Views in 2025" shouldAnimate={isStatsVisible} delay={200} />
            </BentoItem>
            <BentoItem index={3} isVisible={isStatsVisible}>
              <AnimatedStat value={2.9} suffix="K+" label="Instagram Followers" shouldAnimate={isStatsVisible} delay={300} />
            </BentoItem>
          </BentoGrid>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 bg-[#FFFBFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`font-heading text-3xl font-bold text-[#4A4A4A] text-center mb-12 transition-all duration-700 ${
              isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Services & Offerings
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                  isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-[#F8A5B8]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#4A4A4A] mb-3">{service.title}</h3>
                <p className="text-[#4A4A4A]/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Section with Animated Progress Bars */}
      <section ref={audienceRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`font-heading text-3xl font-bold text-[#4A4A4A] text-center mb-12 transition-all duration-700 ${
              isAudienceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Audience Demographics
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-700 ${
                isAudienceVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="space-y-6">
                <AnimatedProgressBar label="Women" percentage={72} shouldAnimate={isAudienceVisible} delay={0} />
                <AnimatedProgressBar label="Ages 18-34" percentage={68} shouldAnimate={isAudienceVisible} delay={150} />
                <AnimatedProgressBar label="DFW Area" percentage={85} shouldAnimate={isAudienceVisible} delay={300} />
              </div>
            </div>
            <div
              className={`bg-[#FFF5F7] p-8 rounded-2xl transition-all duration-700 ${
                isAudienceVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="font-heading text-xl font-semibold text-[#4A4A4A] mb-4">Ideal For</h3>
              <ul className="space-y-3 text-[#4A4A4A]/80">
                {[
                  'Restaurants & Cafes',
                  'Food & Beverage Brands',
                  'Event Venues & Organizers',
                  'Travel & Hospitality',
                  'Lifestyle Brands',
                ].map((item, index) => (
                  <li
                    key={item}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isAudienceVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${300 + index * 75}ms` }}
                  >
                    <span className="w-2 h-2 bg-[#F8A5B8] rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Past Collaborations */}
      <section ref={brandsRef} className="py-16 bg-[#FFFBFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`font-heading text-3xl font-bold text-[#4A4A4A] text-center mb-4 transition-all duration-700 ${
              isBrandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Past Collaborations
          </h2>
          <p
            className={`text-center text-[#4A4A4A]/70 mb-12 max-w-2xl mx-auto transition-all duration-700 ${
              isBrandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            I've had the pleasure of working with amazing restaurants and brands across DFW
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div
                key={brand}
                className={`bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
                  isBrandsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${200 + index * 75}ms` }}
              >
                <p className="font-medium text-[#4A4A4A]">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8A5B8] to-[#E8899C] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Ready to Collaborate?
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Let's create content that drives results. Whether you're a restaurant looking for exposure or a brand seeking authentic UGC, I'd love to hear from you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-[#F8A5B8] hover:bg-[#FFF5F7] hover:shadow-xl group"
              >
                <span>Get in Touch</span>
                <svg
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <a
              href="mailto:chloe_yun@aol.com"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              chloe_yun@aol.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
