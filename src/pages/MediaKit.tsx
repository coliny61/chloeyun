import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import { useSiteSettings } from '../hooks/useSupabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BentoGrid, BentoItem } from '../components/ui/BentoGrid';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackEvent } from '../lib/analytics';

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
      <p className="text-[#2D2424] mt-2">{label}</p>
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <span className="text-[#2D2424] font-medium">{label}</span>
        <span className="text-[#F8A5B8] font-semibold">{percentage}%</span>
      </div>
      <div className="h-3 bg-[#FFF5F7] rounded-full overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-[#F8A5B8] to-[#E8919F] rounded-full transition-all duration-1000 ease-out"
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

function parseStatValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^([\d.]+)([KMB+%]*)/);
  if (match) return { number: parseFloat(match[1]), suffix: match[2] || '' };
  return { number: 0, suffix: '' };
}

export default function MediaKit() {
  usePageMeta(
    'Media Kit | Chloe Eats DFW',
    'Partner with Chloe Eats DFW. Social stats, audience demographics, services, and past collaborations. Contact for rates.'
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { stats: siteStats, settings } = useSiteSettings();

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);
      return;
    }
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5F7] to-[#FDD5DD] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8A5B8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1
                className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2424] transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Media Kit
              </h1>
              <p
                className={`mt-6 text-xl text-[#2D2424]/80 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                27K+ followers. 2.8M+ views. A loyal DFW audience that shows up and eats. Here's everything you need to know about partnering with me.
              </p>
              <div
                className={`mt-8 flex flex-wrap gap-4 justify-center lg:justify-start transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <Link to="/contact">
                  <Button size="lg">Contact for Rates</Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => { trackEvent('download', 'Media Kit', 'PDF'); window.print(); }}
                  className="group"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
            <div
              className={`flex justify-center lg:justify-end transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="w-64 h-80 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/images/chloe/portrait-elegant.jpg"
                  alt="Chloe Yun"
                  className="w-full h-full object-cover object-[center_15%] scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Bento Grid */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`font-heading text-3xl font-bold text-[#2D2424] text-center mb-12 transition-all duration-700 ${
              isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            By The Numbers
          </h2>
          <BentoGrid columns={4}>
            {[
              { ...parseStatValue(siteStats.tikTokFollowers || '27K+'), label: 'TikTok Followers' },
              { ...parseStatValue(siteStats.tikTokLikes || '1.6M+'), label: 'TikTok Likes' },
              { ...parseStatValue(siteStats.viewsThisYear || '2.8M+'), label: 'Total Views' },
              { ...parseStatValue(siteStats.instagramFollowers || '2.9K+'), label: 'Instagram Followers' },
            ].map((stat, index) => (
              <BentoItem key={stat.label} index={index} isVisible={isStatsVisible}>
                <AnimatedStat
                  value={stat.number}
                  suffix={stat.suffix}
                  label={stat.label}
                  shouldAnimate={isStatsVisible}
                  delay={index * 100}
                />
              </BentoItem>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`font-heading text-3xl font-bold text-[#2D2424] text-center mb-12 transition-all duration-700 ${
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
                <h3 className="font-heading text-xl font-semibold text-[#2D2424] mb-3">{service.title}</h3>
                <p className="text-[#2D2424]/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Section with Animated Progress Bars */}
      <section ref={audienceRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`font-heading text-3xl font-bold text-[#2D2424] text-center mb-12 transition-all duration-700 ${
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
                <AnimatedProgressBar label="Women" percentage={parseInt(settings['audience_women_pct']) || 72} shouldAnimate={isAudienceVisible} delay={0} />
                <AnimatedProgressBar label="Ages 18-34" percentage={parseInt(settings['audience_18_34_pct']) || 68} shouldAnimate={isAudienceVisible} delay={150} />
                <AnimatedProgressBar label="DFW Area" percentage={parseInt(settings['audience_dfw_pct']) || 85} shouldAnimate={isAudienceVisible} delay={300} />
              </div>
            </div>
            <div
              className={`bg-[#FFF5F7] p-8 rounded-2xl transition-all duration-700 ${
                isAudienceVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="font-heading text-xl font-semibold text-[#2D2424] mb-4">Ideal For</h3>
              <ul className="space-y-3 text-[#2D2424]/80">
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
      <section ref={brandsRef} className="py-16 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`font-heading text-3xl font-bold text-[#2D2424] text-center mb-4 transition-all duration-700 ${
              isBrandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Past Collaborations
          </h2>
          <p
            className={`text-center text-[#2D2424]/70 mb-12 max-w-2xl mx-auto transition-all duration-700 ${
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
                <p className="font-medium text-[#2D2424]">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8A5B8] to-[#E8919F] relative overflow-hidden">
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
                className="bg-[#2D2424] text-white hover:bg-[#3a3a3a] hover:shadow-xl shadow-lg group"
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
