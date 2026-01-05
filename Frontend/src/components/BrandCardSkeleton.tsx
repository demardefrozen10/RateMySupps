export default function BrandCardSkeleton() {
  return (
    <div className="flex items-center justify-between bg-white border-2 border-gray-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="w-30 h-30 bg-gray-200 rounded-lg animate-pulse" />
        
        <div className="flex flex-col gap-3">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-12 w-20 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-3 w-24 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        <div className="w-6 h-6 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
