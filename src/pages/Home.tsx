import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import FeaturedSpots from '../components/home/FeaturedSpots';
import Stats from '../components/home/Stats';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedSpots />
      <Stats />

      {/* About Preview Section */}
      <section className="py-20 bg-[#FFF9E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
                alt="Chloe exploring food"
                className="rounded-3xl shadow-xl w-full object-cover aspect-square"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[200px]">
                <p className="font-heading text-2xl font-bold text-[#FF6B6B]">5+</p>
                <p className="text-[#6B5B5B] text-sm">Years of food exploring</p>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#6B5B5B]">
                Hi, I'm Chloe!
              </h2>
              <p className="mt-6 text-lg text-[#6B5B5B]/80 leading-relaxed">
                Food has always been my love language. Whether it's discovering a hidden gem in Chinatown
                or finding the perfect croissant in the West Village, I'm on a mission to share the best
                spots with you.
              </p>
              <p className="mt-4 text-lg text-[#6B5B5B]/80 leading-relaxed">
                From budget-friendly bites to special occasion splurges, I've got recommendations for
                every craving and occasion. Let's eat!
              </p>
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline">
                    Learn More About Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-20 bg-gradient-to-br from-[#FF6B6B] to-[#E07A5F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Let's Work Together
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Looking for authentic food content that resonates? I partner with restaurants and brands
            that share my passion for great food and genuine experiences.
          </p>
          <div className="mt-8">
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#FF6B6B] hover:bg-[#FFF9E6]"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
