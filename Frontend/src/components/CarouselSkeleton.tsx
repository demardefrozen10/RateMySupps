export default function CarouselSkeleton() {
  return (
    <div className="min-w-[200px] md:min-w-[240px] flex-shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="h-40 bg-slate-200 animate-pulse" />
      
      <div className="p-3 space-y-2">
        <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-slate-200 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-slate-200 rounded animate-pulse mt-2" />
      </div>
    </div>
  );
}
