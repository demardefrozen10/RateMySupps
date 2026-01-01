import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import type { Supplement } from '../types/Supplement';
import { useNavigate } from 'react-router-dom';

type CarouselProps = {
  title: string;
  supplements: Supplement[];
};

export default function Carousel({ title, supplements }: CarouselProps) {
  const { get } = useFetch("http://localhost:8080/api/supplement/");
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  if(supplements.length === 0) {
    return null;
  }

    const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -350 : 350;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };


  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        <div className="w-12 h-1.5 bg-emerald-500 mt-4 rounded-full"></div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50"
        >
          <ChevronRight size={24} />
        </button>

      <div ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10 px-4 -mx-4"
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
              <div className="h-64 overflow-hidden bg-slate-50/50 relative">
                <img 
                  src={supplement.imageUrl} 
                  alt={supplement.supplementName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-600 px-3 py-1.5 rounded-full shadow-sm border border-white">
                    {item.category}
                   </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-slate-800 truncate">{supplement.supplementName}</h3>
                <p className="text-xs text-emerald-400">{supplement.brandName}</p>
                <p className="text-xs text-slate-500 mt-1">{supplement.totalReviews} Reviews</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
