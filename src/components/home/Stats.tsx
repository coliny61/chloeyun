import { mockStats } from '../../lib/mockData';

const stats = [
  { label: 'TikTok Followers', value: mockStats.tikTokFollowers },
  { label: 'Instagram Followers', value: mockStats.instagramFollowers },
  { label: 'Spots Reviewed', value: mockStats.totalReviews.toString() },
  { label: 'Cities Covered', value: mockStats.citiesCovered.toString() },
];

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#FF6B6B] to-[#E07A5F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-white/80 text-sm sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
