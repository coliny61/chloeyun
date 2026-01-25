import { Link } from 'react-router-dom';
import { useFeaturedPlaces } from '../../hooks/usePlaces';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '../ui/Card';
import { BentoGrid, BentoItem } from '../ui/BentoGrid';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { LoadingCard } from '../ui/Loading';
import Button from '../ui/Button';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function FeaturedSpots() {
  const { places, loading } = useFeaturedPlaces();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Define bento layout sizes for visual interest
  const getBentoSize = (index: number): 'sm' | 'md' | 'lg' | 'wide' | 'tall' => {
    // First item is featured (tall)
    if (index === 0) return 'tall';
    // Fourth item spans 2 columns (wide)
    if (index === 3) return 'wide';
    return 'md';
  };

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDD5DD]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F8A5B8]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A4A4A]">
            Featured Food Spots
          </h2>
          <p className="mt-4 text-lg text-[#4A4A4A]/70 max-w-2xl mx-auto">
            My hand-picked favorites that you absolutely have to try. These are the places I keep coming back to!
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : (
          <BentoGrid columns={3}>
            {places.map((place, index) => {
              const size = getBentoSize(index);
              const isFeatured = index === 0;

              return (
                <BentoItem
                  key={place.id}
                  size={size}
                  index={index}
                  isVisible={isVisible}
                >
                  <Link to={`/place/${place.id}`} className="group h-full block">
                    <Card
                      hover
                      variant={isFeatured ? 'featured' : 'default'}
                      hoverEffect={isFeatured ? 'glow' : 'lift'}
                      className="h-full"
                    >
                      <CardImage
                        src={place.coverImage}
                        alt={place.name}
                        className={isFeatured ? 'h-64 lg:h-full lg:absolute lg:inset-0' : 'h-48'}
                      />
                      <CardContent className={isFeatured ? 'lg:relative lg:z-10 lg:mt-auto lg:bg-gradient-to-t lg:from-black/80 lg:to-transparent lg:text-white lg:p-6' : ''}>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className={`group-hover:text-[#F8A5B8] transition-colors ${isFeatured ? 'lg:text-white lg:group-hover:text-[#FDD5DD] text-xl' : ''}`}>
                            {place.name}
                          </CardTitle>
                          <Badge variant="price">{place.priceRange}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="cuisine">{place.cuisineType}</Badge>
                          <Rating value={place.rating} size="sm" />
                        </div>
                        <CardDescription className={`flex items-center gap-1 mt-2 ${isFeatured ? 'lg:text-white/80' : ''}`}>
                          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{place.address}</span>
                        </CardDescription>
                        {isFeatured && (
                          <p className="mt-3 text-sm text-[#4A4A4A]/80 lg:text-white/90 line-clamp-2 hidden lg:block">
                            {place.reviewContent}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </BentoItem>
              );
            })}
          </BentoGrid>
        )}

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Link to="/map">
            <Button size="lg" className="group">
              <span>View All Spots on Map</span>
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
  );
}
