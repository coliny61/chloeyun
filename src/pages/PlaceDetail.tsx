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

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>();
  const { place, loading, error } = usePlace(id);

  const handleShare = async () => {
    const shareData = {
      title: place?.name,
      text: `Check out ${place?.name} - recommended by Chloe Yun!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBFC]">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-[#4A4A4A]">Place not found</h1>
          <p className="text-[#4A4A4A]/70 mt-2">This spot might have been removed or doesn't exist.</p>
          <Link to="/map" className="mt-6 inline-block">
            <Button>Back to Map</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      {/* Hero Image */}
      <div className="relative h-[40vh] sm:h-[50vh]">
        <img
          src={place.coverImage}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <Link
          to="/map"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-[#4A4A4A]" />
        </Link>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ShareIcon className="w-5 h-5 text-[#4A4A4A]" />
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
              <h2 className="font-heading text-2xl font-semibold text-[#4A4A4A] mb-4">
                Chloe's Review
              </h2>
              <div className="prose prose-lg max-w-none text-[#4A4A4A]/90">
                <p className="whitespace-pre-line">{place.reviewContent}</p>
              </div>
            </section>

            {/* TikTok Video */}
            {place.tikTokUrl && (
              <section>
                <h2 className="font-heading text-2xl font-semibold text-[#4A4A4A] mb-4">
                  Watch My TikTok Review
                </h2>
                <TikTokEmbed url={place.tikTokUrl} />
              </section>
            )}

            {/* Instagram Post */}
            {place.instagramUrl && (
              <section>
                <h2 className="font-heading text-2xl font-semibold text-[#4A4A4A] mb-4">
                  See It on Instagram
                </h2>
                <InstagramEmbed url={place.instagramUrl} />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-heading text-xl font-semibold text-[#4A4A4A] mb-4">
                Details
              </h3>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-[#F8A5B8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A]">Address</p>
                    <p className="text-[#4A4A4A]/70">{place.address}</p>
                  </div>
                </div>

                {/* Hours */}
                {place.hours && (
                  <div className="flex items-start gap-3">
                    <ClockIcon className="w-5 h-5 text-[#F8A5B8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#4A4A4A]">Hours</p>
                      <p className="text-[#4A4A4A]/70">{place.hours}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {place.phone && (
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-[#F8A5B8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#4A4A4A]">Phone</p>
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
                      <p className="text-sm font-medium text-[#4A4A4A]">Website</p>
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

              {/* Get Directions Button */}
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

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#FFF5F7] rounded-full text-[#4A4A4A] hover:bg-[#FFF5F7] transition-colors font-medium"
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
