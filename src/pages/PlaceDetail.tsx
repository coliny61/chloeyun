import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  ClockIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { usePlace } from '../hooks/usePlaces';
import { getGoogleMapsUrl } from '../lib/utils';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import Button from '../components/ui/Button';
import TikTokEmbed from '../components/embeds/TikTokEmbed';
import InstagramEmbed from '../components/embeds/InstagramEmbed';
import { LoadingPage } from '../components/ui/Loading';
import { LogoIcon } from '../components/ui/Logo';

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>();
  const { place, loading, error } = usePlace(id);

  // SEO: update document title and inject JSON-LD
  useEffect(() => {
    if (!place) return;

    document.title = `${place.name} — Chloe Eats DFW`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      `${place.name} — ${place.cuisineType} restaurant in DFW. Rated ${place.rating}/5 by Chloe. ${(place.reviewContent || '').slice(0, 120)}`
    );

    // Restaurant schema JSON-LD
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: place.name,
      address: place.address || undefined,
      telephone: place.phone || undefined,
      url: place.website || undefined,
      servesCuisine: place.cuisineType || undefined,
      priceRange: place.priceRange || undefined,
      aggregateRating: place.rating
        ? {
            '@type': 'AggregateRating',
            ratingValue: place.rating,
            bestRating: 5,
            worstRating: 1,
            ratingCount: 1,
          }
        : undefined,
    };

    let script = document.querySelector('#place-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'place-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = 'Chloe Eats DFW | Dallas-Fort Worth Food Explorer';
      script?.remove();
    };
  }, [place]);

  const handleShare = async () => {
    const shareData = {
      title: place?.name,
      text: `Check out ${place?.name} - recommended by Chloe Yun!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  // Branded 404 if place not found
  if (error || !place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] px-4">
        <div className="text-center max-w-md">
          <LogoIcon size={64} className="mx-auto opacity-60" />
          <h1 className="mt-6 font-heading text-2xl font-bold text-[#2D2424]">
            This spot's not on the menu
          </h1>
          <p className="text-[#2D2424]/70 mt-2">
            This place might have been removed or doesn't exist.
          </p>
          <Link to="/food-spots" className="mt-6 inline-block">
            <Button>Browse Food Spots</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatHours = (hours: typeof place.hours) => {
    if (!hours) return null;
    if (typeof hours === 'string') return hours;
    return Object.entries(hours)
      .map(([day, time]) => `${day}: ${time}`)
      .join('\n');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Hero Image */}
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        {place.coverImage ? (
          <img
            src={place.coverImage}
            alt={place.name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#FFF5F7] to-[#F8A5B8]/30 flex items-center justify-center">
            <LogoIcon size={80} className="opacity-30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <Link
          to="/food-spots"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Back to Food Spots"
        >
          <ArrowLeftIcon className="w-5 h-5 text-[#2D2424]" />
        </Link>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Share this spot"
        >
          <ShareIcon className="w-5 h-5 text-[#2D2424]" />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="cuisine" className="bg-white/20 text-white">
                {place.cuisineType}
              </Badge>
              <Badge variant="price" className="bg-white/20 text-white">
                {place.priceRange}
              </Badge>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold">{place.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Rating value={place.rating} size="md" />
              <span className="text-white/90">{place.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Review */}
            <section>
              <h2 className="font-heading text-2xl font-semibold text-[#2D2424] mb-4">
                Chloe's Review
              </h2>
              <div className="prose prose-lg max-w-none text-[#2D2424]/90">
                <p className="whitespace-pre-line">{place.reviewContent}</p>
              </div>
            </section>

            {/* TikTok Video — inline playable, lazy-loaded */}
            {place.tikTokUrl && (
              <section>
                <h2 className="font-heading text-2xl font-semibold text-[#2D2424] mb-4">
                  Watch My TikTok Review
                </h2>
                <TikTokEmbed url={place.tikTokUrl} />
              </section>
            )}

            {/* Instagram Post — inline, lazy-loaded */}
            {place.instagramUrl && (
              <section>
                <h2 className="font-heading text-2xl font-semibold text-[#2D2424] mb-4">
                  See It on Instagram
                </h2>
                <InstagramEmbed url={place.instagramUrl} />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-heading text-xl font-semibold text-[#2D2424] mb-4">
                Details
              </h3>

              <div className="space-y-4">
                {/* Address */}
                {place.address && (
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-[#F8A5B8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#2D2424]">Address</p>
                      <p className="text-[#2D2424]/70">{place.address}</p>
                    </div>
                  </div>
                )}

                {/* Hours */}
                {place.hours && (
                  <div className="flex items-start gap-3">
                    <ClockIcon className="w-5 h-5 text-[#F8A5B8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#2D2424]">Hours</p>
                      <p className="text-[#2D2424]/70 whitespace-pre-line">
                        {formatHours(place.hours)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {place.phone && (
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-[#F8A5B8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#2D2424]">Phone</p>
                      <a
                        href={`tel:${place.phone}`}
                        className="text-[#F8A5B8] hover:underline"
                      >
                        {place.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Website */}
                {place.website && (
                  <div className="flex items-start gap-3">
                    <GlobeAltIcon className="w-5 h-5 text-[#F8A5B8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#2D2424]">Website</p>
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F8A5B8] hover:underline break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Get Directions */}
              {place.address && (
                <a
                  href={getGoogleMapsUrl(place.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6"
                >
                  <Button className="w-full">
                    Get Directions
                  </Button>
                </a>
              )}

              {/* Share */}
              <button
                onClick={handleShare}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#FFF5F7] rounded-full text-[#2D2424] hover:bg-[#FFF5F7] transition-colors font-medium"
              >
                <ShareIcon className="w-5 h-5" />
                Share This Spot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
