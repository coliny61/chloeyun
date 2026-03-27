import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Stats from '../components/home/Stats';
import { useAboutPhotos } from '../hooks/useSupabase';
import { usePageMeta } from '../hooks/usePageMeta';

export default function About() {
  usePageMeta(
    'About Chloe | Chloe Eats DFW',
    'Meet Chloe Yun — DFW food content creator sharing the best restaurants, hidden gems, and culinary adventures in Dallas-Fort Worth.'
  );
  const { photos } = useAboutPhotos();
  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFF5F7] via-[#FAF6F0] to-[#FDD5DD]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#2D2424]">
                Hey there! I'm
                <span className="block text-[#F8A5B8]">Chloe Yun</span>
              </h1>
              <p className="mt-6 text-lg text-[#2D2424]/80 leading-relaxed">
                I'm a DFW food content creator with 27K+ TikTok followers and over 2.8 million views — on a
                mission to put every incredible restaurant, hidden gem, and hole-in-the-wall on the map.
                If it's worth eating in Dallas-Fort Worth, I've probably already filmed it.
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
                src="/images/chloe/eating-casual.jpg"
                alt="Chloe Yun"
                className="rounded-3xl shadow-2xl w-full object-cover object-top aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4">
                <p className="font-heading text-2xl font-bold text-[#F8A5B8]">DFW</p>
                <p className="text-sm text-[#2D2424]">Based & Eating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* My Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#2D2424] text-center">
            My Food Journey
          </h2>
          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none text-[#2D2424]/80">
              <p>
                Growing up Korean-American in Dallas, food was the center of everything — Sunday
                mornings making kimchi jjigae with my grandmother, after-school runs to H Mart,
                and family dinners where trying something new was always the move.
              </p>
              <p className="mt-4">
                What started as posting food pics for friends turned into something way bigger. My
                honest, no-filter reviews started resonating with people across DFW — and before I
                knew it, I'd built a community of thousands who trust me to find their next favorite spot.
              </p>
              <p className="mt-4">
                Now I spend my days hunting down the best eats from Carrollton to Deep Ellum, creating
                TikTok and Instagram content that makes people hungry, and partnering with restaurants
                who want real, authentic exposure to the DFW food community. KBBQ, tacos, brunch, late-night
                bites — if you're craving it, I've got a recommendation.
              </p>
            </div>
            {/* Photo Gallery - All vertical images */}
            <div className="grid grid-cols-3 gap-4">
              {photos.length > 0 ? (
                photos.slice(0, 3).map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.image_url}
                    alt="Chloe"
                    className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover object-top"
                    loading="lazy"
                  />
                ))
              ) : (
                <>
                  <img
                    src="/images/chloe/portrait-elegant.jpg"
                    alt="Chloe at an elegant dinner"
                    className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover object-top"
                    loading="lazy"
                  />
                  <img
                    src="/images/chloe/pizza-happiness.jpg"
                    alt="Chloe excited about pizza"
                    className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover object-top"
                    loading="lazy"
                  />
                  <img
                    src="/images/chloe/content-creator.jpg"
                    alt="Chloe creating content"
                    className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover object-top"
                    loading="lazy"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 bg-[#FFF5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#2D2424] text-center">
            What I Do
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Restaurant Reviews',
                description: 'In-depth, honest reviews that drive real foot traffic. I highlight the dishes worth ordering and the vibes worth experiencing.',
                icon: '🍽️',
              },
              {
                title: 'TikTok Videos',
                description: 'Short-form videos that rack up views and get people through your door. Engaging, authentic, and optimized for the algorithm.',
                icon: '🎬',
              },
              {
                title: 'Instagram Content',
                description: 'Scroll-stopping food photography, Reels, and Stories that showcase your restaurant to an engaged, local audience.',
                icon: '📸',
              },
              {
                title: 'Food Guides',
                description: 'Curated lists and guides like "Best Korean BBQ in DFW" or "Budget-Friendly Date Night Spots in Dallas".',
                icon: '📍',
              },
              {
                title: 'Brand Partnerships',
                description: 'Paid partnerships with restaurants and food brands I genuinely love. Real content, real results, real audience trust.',
                icon: '🤝',
              },
              {
                title: 'Community',
                description: 'A loyal community of DFW food lovers who actively share recommendations, tag friends, and show up to eat.',
                icon: '❤️',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="font-heading text-xl font-semibold text-[#2D2424] mt-4">
                  {item.title}
                </h3>
                <p className="text-[#2D2424]/70 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8A5B8] to-[#E8919F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Let's Connect!
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Want authentic content that actually drives people to your restaurant? Let's make it happen.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#d4758a] hover:bg-[#FFF5F7] hover:text-[#c4657a] shadow-lg"
              >
                Get in Touch
              </Button>
            </Link>
            <Link to="/food-spots">
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
