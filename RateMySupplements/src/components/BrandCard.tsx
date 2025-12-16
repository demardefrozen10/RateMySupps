export default function BrandCard() {
    return (
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                        Average Review
                    </span>
                    <div className="bg-red-300 rounded px-4 py-2">
                        <span className="text-4xl font-bold text-black">2.9</span>
                    </div>
                    <span className="text-sm text-gray-500 mt-2">47 ratings</span>
                </div>
                
                <h2 className="text-2xl font-bold text-black">Revolution Nutrition</h2>
            </div>
        
        </div>
    )
}