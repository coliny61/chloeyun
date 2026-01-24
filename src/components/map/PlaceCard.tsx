import { Link } from 'react-router-dom';
import { MapPinIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import type { Place } from '../../types';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { truncateText, getGoogleMapsUrl } from '../../lib/utils';

interface PlaceCardProps {
  place: Place;
  compact?: boolean;
}

export default function PlaceCard({ place, compact = false }: PlaceCardProps) {
  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 max-w-[280px]">
        <div className="flex gap-3">
          <img
            src={place.coverImage}
            alt={place.name}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-[#6B5B5B] truncate">
              {place.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="cuisine" className="text-xs px-2 py-0.5">
                {place.cuisineType}
              </Badge>
              <span className="text-[#E07A5F] font-medium text-sm">{place.priceRange}</span>
            </div>
            <div className="mt-1">
              <Rating value={place.rating} size="sm" showValue />
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            to={`/place/${place.id}`}
            className="flex-1 bg-[#FF6B6B] text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-[#E07A5F] transition-colors"
          >
            View Details
          </Link>
          <a
            href={getGoogleMapsUrl(place.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-[#FFF9E6] text-[#6B5B5B] rounded-lg hover:bg-[#FFEAA7] transition-colors"
          >
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/place/${place.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group"
    >
      <div className="relative h-40">
        <img
          src={place.coverImage}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="price" className="bg-white/90 backdrop-blur-sm">
            {place.priceRange}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold text-[#6B5B5B] group-hover:text-[#FF6B6B] transition-colors">
            {place.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="cuisine">{place.cuisineType}</Badge>
          <Rating value={place.rating} size="sm" showValue />
        </div>
        <p className="mt-2 text-sm text-[#6B5B5B]/70 flex items-center gap-1">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{place.address}</span>
        </p>
        <p className="mt-2 text-sm text-[#6B5B5B]/80 line-clamp-2">
          {truncateText(place.reviewContent, 100)}
        </p>
      </div>
    </Link>
  );
}
