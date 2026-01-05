import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Supplement } from '../types/Supplement';
import { useNavigate } from 'react-router-dom';
import CarouselSkeleton from './CarouselSkeleton';

export default function Carousel({ title, supplements, loading = false }: { title: string, supplements: Supplement[], loading?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-1 rounded-full border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-1 rounded-full border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {supplements.map((supplement) => {
          const handleCardClick = () => {
            navigate(`/product/${supplement.brandName}/${supplement.supplementName}/${supplement.id}`, { state: { supplement: supplement } });
          };
          return (
            <div 
              key={supplement.id}
              className="min-w-[200px] md:min-w-[240px] flex-shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow snap-start"
              onClick={handleCardClick}
            >
        <div className="h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
  <img 
    src={supplement.imageUrl} 
    alt={supplement.supplementName} 
    className="carousel-image"
  />
</div>

              <div className="p-3">
                <h3 className="font-bold text-sm text-slate-800 truncate">{supplement.supplementName}</h3>
                <p className="text-xs text-emerald-400">{supplement.brandName}</p>
                <p className="text-xs text-slate-500 mt-1">{supplement.totalReviews} Reviews</p>
              </div>
            </div>
          );
        })}
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <CarouselSkeleton key={index} />
            ))}
          </>
        ) : (
          supplements.map((supplement) => {
            const handleCardClick = () => {
              navigate(`/product/${supplement.brandName}/${supplement.supplementName}/${supplement.id}`, { state: { supplement: supplement } });
            };
            return (
              <div 
                key={supplement.id}
                className="min-w-[200px] md:min-w-[240px] flex-shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow snap-start"
                onClick={handleCardClick}
              >
                <div className="h-40 bg-slate-100">
                  <img 
                    src={supplement.imageUrl} 
                    alt={supplement.supplementName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-slate-800 truncate">{supplement.supplementName}</h3>
                  <p className="text-xs text-emerald-400">{supplement.brandName}</p>
                  <p className="text-xs text-slate-500 mt-1">{supplement.totalReviews} Reviews</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}