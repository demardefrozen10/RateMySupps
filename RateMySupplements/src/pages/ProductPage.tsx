import { useState } from "react"

export default function ProductPage() {
    const [selectedImage, setSelectedImage] = useState(0)
    
    const productImages = [
        "https://via.placeholder.com/500x500/10b981/ffffff?text=Product+Image+1",
        "https://via.placeholder.com/500x500/059669/ffffff?text=Product+Image+2",
        "https://via.placeholder.com/500x500/047857/ffffff?text=Product+Image+3"
    ]

    const reviews = [
        { id: 1, author: "John D.", rating: 5, date: "Dec 10, 2025", comment: "Amazing product! Really helped with my gains. The chocolate flavor is delicious and mixes well.", helpful: 24 },
        { id: 2, author: "Sarah M.", rating: 4, date: "Dec 8, 2025", comment: "Good quality protein. A bit pricey but worth it for the results.", helpful: 15 },
        { id: 3, author: "Mike R.", rating: 5, date: "Dec 5, 2025", comment: "Best protein powder I've tried. No bloating and tastes great!", helpful: 32 }
    ]

    return (
        <div className="min-h-screen to-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
         

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    <div>
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-4">
                            <img 
                                src={productImages[selectedImage]} 
                                alt="Product" 
                                className="w-full h-96 object-contain"
                            />
                        </div>
                        <div className="flex gap-4 justify-center">
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                        idx === selectedImage ? 'border-emerald-500' : 'border-gray-200'
                                    }`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold mb-2 inline-block">
                                Revolution Nutrition
                            </a>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                Gold Standard Whey Protein
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg px-4 py-2 shadow-md">
                                        <span className="text-3xl font-bold text-white">4.8</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-700">Excellent</div>
                                        <div className="text-xs text-gray-500">Based on 156 reviews</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <h3 className="font-bold text-lg mb-4">Product Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <span className="font-semibold">Protein Powder</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Serving Size:</span>
                                    <span className="font-semibold">30g</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Protein per Serving:</span>
                                    <span className="font-semibold">24g</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Flavors:</span>
                                    <span className="font-semibold">Chocolate, Vanilla, Strawberry</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg mb-4">
                            Leave a Review
                        </button>
                        
                        <div className="flex gap-2">
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                                Gluten Free
                            </span>
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                                Non-GMO
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
                        <select className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer">
                            <option value="recent">Most Recent</option>
                            <option value="helpful">Most Helpful</option>
                            <option value="highest">Highest Rated</option>
                            <option value="lowest">Lowest Rated</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 pb-8 border-b">
                        {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-2">
                                <span className="text-sm font-medium">{stars}★</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-emerald-500 h-2 rounded-full" 
                                        style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                                    />
                                </div>
                                <span className="text-xs text-gray-500">{stars === 5 ? 110 : stars === 4 ? 31 : 5}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="border-b pb-6 last:border-b-0">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                                                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-semibold text-emerald-700">Verified Purchase</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{review.date}</span>
                                        </div>
                                        <div className="flex gap-1 mb-2">
                                            {[...Array(5)].map((_, idx) => (
                                                <span key={idx} className={idx < review.rating ? "text-yellow-400" : "text-gray-300"}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-3">{review.comment}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <button className="text-gray-500 hover:text-emerald-600 flex items-center gap-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        Helpful ({review.helpful})
                                    </button>
                                    <button className="text-gray-500 hover:text-red-600">
                                        Report
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-3 border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors">
                        Load More Reviews
                    </button>
                </div>
            </div>
        </div>
    )
}