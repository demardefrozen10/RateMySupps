import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import type { Supplement } from '../types/Supplement';
import { useNavigate } from 'react-router-dom';

export default function Carousel({ title }: { title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {get} = useFetch("http://localhost:8080/api/supplement/");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const navigate = useNavigate();

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    get('top-rated').then((data: Supplement[]) => {
      setSupplements(data);
    })
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 font-sans">
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
        {supplements.map((item) => {
          const handleCardClick = () => {
            navigate(`/product/${item.id}`, { state: { supplementId: item.id, brandName: item.brand } });
          };
          return (
            <div 
              key={item.id}
              className="min-w-[200px] md:min-w-[240px] flex-shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow snap-start"
              onClick={handleCardClick}
            >
              <div className="h-40 bg-slate-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.supplementName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-slate-800 truncate">{item.supplementName}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.totalReviews} Reviews</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

