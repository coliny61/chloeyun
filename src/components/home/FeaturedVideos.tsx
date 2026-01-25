import { Link } from 'react-router-dom';
import { useFeaturedPlaces } from '../../hooks/usePlaces';
import TikTokEmbed from '../embeds/TikTokEmbed';
import Button from '../ui/Button';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

export default function FeaturedVideos() {
  const { places } = useFeaturedPlaces();

  // Get featured places that have TikTok URLs
  const featuredWithTikTok = places.filter(place => place.tikTokUrl).slice(0, 2);

  if (featuredWithTikTok.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#FFFBFC] to-[#FFF5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F8A5B8]/10 text-[#F8A5B8] px-4 py-2 rounded-full mb-4">
            <PlayCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Latest Reviews</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A4A4A]">
            Featured Video Reviews
          </h2>
          <p className="mt-4 text-lg text-[#4A4A4A]/70 max-w-2xl mx-auto">
            Watch my latest food adventures! Get the full experience before you visit.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredWithTikTok.map((place) => (
            <div key={place.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-[#FFF5F7]">
                <Link
                  to={`/place/${place.id}`}
                  className="font-heading text-xl font-semibold text-[#4A4A4A] hover:text-[#F8A5B8] transition-colors"
                >
                  {place.name}
                </Link>
                <p className="text-sm text-[#4A4A4A]/60 mt-1">
                  {place.cuisineType} • {place.priceRange}
                </p>
              </div>
              {place.tikTokUrl && (
                <TikTokEmbed url={place.tikTokUrl} />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/map">
            <Button variant="outline" size="lg">
              Explore All Food Spots
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
