export default function BrandCard() {
    return (
        <div className="flex items-center justify-between bg-white border-2 border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                        src="https://via.placeholder.com/80" 
                        alt="Brand Logo" 
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-gray-800 hover:text-emerald-600 transition-colors">
                        Revolution Nutrition
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                        Quality
                    </span>
                    <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg px-4 py-2 shadow-md">
                        <span className="text-3xl font-bold text-white">2.9</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">47 ratings</span>
                </div>

                <div className="text-emerald-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}