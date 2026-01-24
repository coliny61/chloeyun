import { Link } from 'react-router-dom';
import { useFeaturedPlaces } from '../../hooks/usePlaces';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { LoadingCard } from '../ui/Loading';
import Button from '../ui/Button';
import { MapPinIcon } from '@heroicons/react/24/outline';

export default function FeaturedSpots() {
  const { places, loading } = useFeaturedPlaces();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#6B5B5B]">
            Featured Food Spots
          </h2>
          <p className="mt-4 text-lg text-[#6B5B5B]/70 max-w-2xl mx-auto">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Link key={place.id} to={`/place/${place.id}`} className="group">
                <Card hover>
                  <CardImage
                    src={place.coverImage}
                    alt={place.name}
                    className="h-48"
                  />
                  <CardContent>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="group-hover:text-[#FF6B6B] transition-colors">
                        {place.name}
                      </CardTitle>
                      <Badge variant="price">{place.priceRange}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="cuisine">{place.cuisineType}</Badge>
                      <Rating value={place.rating} size="sm" />
                    </div>
                    <CardDescription className="flex items-center gap-1 mt-2">
                      <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{place.address}</span>
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/map">
            <Button size="lg">
              View All Spots on Map
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
