import BrandCard from "../components/BrandCard"

export default function Catalog() {
    return (
        
        <div className="min-h-screen to-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Search Results</h1>
                    <p className="text-lg text-gray-600">
                        <span className="font-semibold text-emerald-600">219 brands</span> found for "Revolution Nutrition"
                    </p>
                </div>

                <div className="mb-6 flex gap-3">
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                        Highest Rated
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 transition-colors">
                        Most Reviews
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 transition-colors">
                        A-Z
                    </button>
                </div>

                <div className="mb-6 text-sm text-gray-600">
                    Can't find the brand? <button className="text-emerald-600 hover:text-emerald-700 font-semibold underline">Add one here</button>
                </div>

                <div className="flex flex-col gap-4">
                   
                </div>
            </div>
        </div>
    )
}