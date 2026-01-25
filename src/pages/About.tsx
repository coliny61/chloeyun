import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Stats from '../components/home/Stats';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFF5F7] via-[#FFFBFC] to-[#FDD5DD]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A4A4A]">
                Hey there! I'm
                <span className="block text-[#F8A5B8]">Chloe Yun</span>
              </h1>
              <p className="mt-6 text-lg text-[#4A4A4A]/80 leading-relaxed">
                I'm a food content creator based in Dallas-Fort Worth, on a mission to discover and share
                the most delicious spots with my amazing community. From hole-in-the-wall gems to
                trendy new restaurants, I'm always on the hunt for my next great meal!
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/chloe_eats_dfw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>Follow on Instagram</Button>
                </a>
                <a
                  href="https://www.tiktok.com/@chloe_yun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Follow on TikTok</Button>
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
                alt="Chloe Yun"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4">
                <p className="font-heading text-2xl font-bold text-[#F8A5B8]">DFW</p>
                <p className="text-sm text-[#4A4A4A]">Based & Eating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* My Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A4A4A] text-center">
            My Food Journey
          </h2>
          <div className="mt-12 prose prose-lg max-w-none text-[#4A4A4A]/80">
            <p>
              Growing up in a Korean-American household, food was always at the center of everything.
              From helping my grandmother make kimchi to exploring the diverse food scene of DFW,
              I've been obsessed with culinary experiences for as long as I can remember.
            </p>
            <p className="mt-4">
              What started as sharing food photos with friends on Instagram quickly grew into something
              bigger. My honest reviews and genuine enthusiasm for discovering hidden gems resonated
              with people, and before I knew it, I had built an incredible community of fellow foodies!
            </p>
            <p className="mt-4">
              Now, I spend my days hunting down the best bites, creating content that makes you hungry,
              and building this platform to make it easier for everyone to find amazing food. Whether
              you're craving Korean BBQ, the perfect slice of pizza, or a cozy brunch spot, I've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 bg-[#FFF5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A4A4A] text-center">
            What I Do
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Restaurant Reviews',
                description: 'Honest, detailed reviews of the best spots in the city. I share the good, the great, and the must-try dishes.',
                icon: '🍽️',
              },
              {
                title: 'TikTok Videos',
                description: 'Quick, engaging videos showcasing the food, the vibes, and everything you need to know before you go.',
                icon: '🎬',
              },
              {
                title: 'Instagram Content',
                description: 'Beautiful food photography and Stories taking you behind the scenes of my culinary adventures.',
                icon: '📸',
              },
              {
                title: 'Food Guides',
                description: 'Curated lists and guides like "Best Korean BBQ in NYC" or "Budget-Friendly Date Spots".',
                icon: '📍',
              },
              {
                title: 'Brand Partnerships',
                description: 'Authentic collaborations with restaurants and food brands that I genuinely love and believe in.',
                icon: '🤝',
              },
              {
                title: 'Community',
                description: 'Building a community of food lovers who share recommendations and discover new favorites together.',
                icon: '❤️',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="font-heading text-xl font-semibold text-[#4A4A4A] mt-4">
                  {item.title}
                </h3>
                <p className="text-[#4A4A4A]/70 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8A5B8] to-[#E8899C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Let's Connect!
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Interested in working together or just want to say hi? I'd love to hear from you!
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#F8A5B8] hover:bg-[#FFF5F7]"
              >
                Get in Touch
              </Button>
            </Link>
            <Link to="/map">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Explore the Map
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
