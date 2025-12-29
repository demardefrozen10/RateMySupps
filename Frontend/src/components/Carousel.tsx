import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import type { Supplement } from '../types/Supplement';
import { useNavigate } from 'react-router-dom';

export default function Carousel({ title }: { title: string }) {
  const { get } = useFetch("http://localhost:8080/api/supplement/");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    get('top-rated')
      .then((data: Supplement[]) => {
        setSupplements(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch supplements:", err);
        setSupplements([]);
      });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        <div className="w-12 h-1.5 bg-emerald-500 mt-4 rounded-full"></div>
      </div>

      <div 
        className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10 px-4 -mx-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {supplements.map((item) => {
          const handleCardClick = () => {
            navigate(`/product/${item.id}`, { 
                state: { supplementId: item.id, brandName: item.brand } 
            });
          };
          
          return (
            <div 
              key={item.id}
              className="min-w-[280px] md:min-w-[320px] group flex-shrink-0 bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 snap-start"
              onClick={handleCardClick}
            >
              <div className="h-64 overflow-hidden bg-slate-50/50 relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.supplementName} 
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-600 px-3 py-1.5 rounded-full shadow-sm border border-white">
                    {item.category}
                   </span>
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1 tracking-tight">
                    {item.supplementName}
                </h3>
                
                <div className="mt-4 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">
                        {(item.averageRating || 0).toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    {item.totalReviews} verified reviews
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}