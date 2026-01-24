import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9E6] via-[#FFFBF5] to-[#FFEAA7]/30" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#6B5B5B] leading-tight">
              Discover the Best
              <span className="block text-[#FF6B6B]">Food in DFW</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#6B5B5B]/80 max-w-lg mx-auto lg:mx-0">
              Join me on a culinary adventure! I'm Chloe, your guide to the most
              delicious hidden gems and must-try restaurants in the city.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/map">
                <Button size="lg">
                  Explore the Food Map
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  About Me
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
              <div>
                <p className="text-2xl font-bold text-[#FF6B6B]">450K+</p>
                <p className="text-sm text-[#6B5B5B]/70">TikTok Followers</p>
              </div>
              <div className="w-px h-12 bg-[#6B5B5B]/20" />
              <div>
                <p className="text-2xl font-bold text-[#FF6B6B]">125K+</p>
                <p className="text-sm text-[#6B5B5B]/70">Instagram Followers</p>
              </div>
              <div className="w-px h-12 bg-[#6B5B5B]/20" />
              <div>
                <p className="text-2xl font-bold text-[#FF6B6B]">200+</p>
                <p className="text-sm text-[#6B5B5B]/70">Spots Reviewed</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
                alt="Delicious food spread"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white text-lg">
                    C
                  </div>
                  <div>
                    <p className="font-semibold text-[#6B5B5B] text-sm">Chloe's Pick</p>
                    <p className="text-xs text-[#6B5B5B]/70">Updated Daily</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#FF6B6B]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#FFEAA7]/40 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
