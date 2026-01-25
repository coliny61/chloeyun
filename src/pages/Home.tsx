import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import FeaturedVideos from '../components/home/FeaturedVideos';
import FeaturedSpots from '../components/home/FeaturedSpots';
import Stats from '../components/home/Stats';
import Button from '../components/ui/Button';
import { WaveDivider, CurveDivider } from '../components/ui/SectionDivider';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Home() {
  const { ref: aboutRef, isVisible: isAboutVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: ctaRef, isVisible: isCtaVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Wave divider between Hero and FeaturedVideos */}
      <WaveDivider fillColor="#FFFFFF" height={60} />

      <FeaturedVideos />

      {/* Curve divider between Videos and FeaturedSpots */}
      <CurveDivider fillColor="#FFFFFF" height={50} />

      <FeaturedSpots />

      {/* Wave divider to Stats */}
      <div className="relative z-10">
        <WaveDivider
          fillColor="rgb(248, 165, 184)"
          height={70}
          position="top"
          className="relative z-10"
        />
      </div>

      <Stats />

      {/* Divider from Stats to About */}
      <WaveDivider fillColor="#FFF5F7" height={60} />

      {/* About Preview Section */}
      <section
        ref={aboutRef}
        className="py-20 bg-[#FFF5F7] relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#F8A5B8]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-[#FDD5DD]/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div
              className={`relative transition-all duration-1000 ${
                isAboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
                alt="Chloe exploring food"
                className="rounded-3xl shadow-xl w-full object-cover aspect-square"
              />
              {/* Floating card */}
              <div
                className={`absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[200px] animate-float transition-all duration-700 ${
                  isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <p className="font-heading text-3xl font-bold gradient-text-animated">5+</p>
                <p className="text-[#4A4A4A] text-sm mt-1">Years of food exploring</p>
              </div>
              {/* Decorative blob */}
              <div className="absolute -top-4 -left-4 w-48 h-48 bg-[#F8A5B8]/20 rounded-full blur-2xl -z-10" />
            </div>

            {/* Content */}
            <div
              className={`transition-all duration-1000 ${
                isAboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A4A4A]">
                Hi, I'm Chloe!
              </h2>
              <p className="mt-6 text-lg text-[#4A4A4A]/80 leading-relaxed">
                Food has always been my love language. Whether it's discovering a hidden gem in Carrollton
                or finding the best KBBQ in DFW, I'm on a mission to share the best spots with you.
              </p>
              <p className="mt-4 text-lg text-[#4A4A4A]/80 leading-relaxed">
                From budget-friendly bites to special occasion splurges, I've got recommendations for
                every craving and occasion. Let's eat!
              </p>
              <div
                className={`mt-8 transition-all duration-700 ${
                  isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <Link to="/about">
                  <Button variant="outline" className="group">
                    <span>Learn More About Me</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider to CTA */}
      <CurveDivider
        fillColor="rgb(248, 165, 184)"
        height={60}
        position="top"
      />

      {/* Partnership CTA */}
      <section
        ref={ctaRef}
        className="py-20 bg-gradient-to-br from-[#F8A5B8] to-[#E8899C] relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            className={`font-heading text-3xl sm:text-4xl font-bold text-white transition-all duration-700 ${
              isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Let's Work Together
          </h2>
          <p
            className={`mt-6 text-lg text-white/90 max-w-2xl mx-auto transition-all duration-700 ${
              isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Looking for authentic food content that resonates? I partner with restaurants and brands
            that share my passion for great food and genuine experiences.
          </p>
          <div
            className={`mt-8 transition-all duration-700 ${
              isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <Link to="/contact">
              <Button
                variant="secondary"
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
          </div>
        </div>
      </section>
    </div>
  );
}
