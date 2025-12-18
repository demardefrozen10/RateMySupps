import { useLocation } from "react-router-dom";
import BrandCard from "../components/BrandCard"
import { useState } from "react"
import type { Brand } from "../types/Brand";

export default function ProductCatalog() {
    const [currentImage, setCurrentImage] = useState(0);


    const location = useLocation();
    const brand: Brand = location.state?.brand;



    const images = [
        "https://via.placeholder.com/1200x300/10b981/ffffff?text=Revolution+Nutrition",
        "https://via.placeholder.com/1200x300/059669/ffffff?text=Revolution+Nutrition",
        "https://via.placeholder.com/1200x300/047857/ffffff?text=Revolution+Nutrition"
    ]

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

    return (
        <div className="min-h-screen to-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8 relative rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${images[currentImage]})` }}>
                        <div className="absolute inset-0 bg-black/40"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-6xl font-bold text-white drop-shadow-lg">{brand.brandName}</h1>
                        </div>

                        <button 
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(idx)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        idx === currentImage ? 'bg-white' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex gap-3 items-center">
                    <input 
                        type="text" 
                        placeholder="Search for a supplement..." 
                        className="flex-1 max-w-md px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                    />
                    
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                        Highest Rated
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 transition-colors">
                        Most Reviews
                    </button>
                    
                    <select className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer">
                        <option value="">Filter</option>
                        <option value="protein">Protein</option>
                        <option value="pre-workout">Pre-Workout</option>
                        <option value="creatine">Creatine</option>
                        <option value="bcaa">BCAA</option>
                        <option value="vitamins">Vitamins</option>
                    </select>
                </div>

                <div className="mb-6 text-sm text-gray-600">
                    Can't find a product? <button className="text-emerald-600 hover:text-emerald-700 font-semibold underline">Add a product here</button>
                </div>

                <div className="flex flex-col gap-4">
                    <BrandCard/>
                </div>
            </div>
        </div>
    )
}