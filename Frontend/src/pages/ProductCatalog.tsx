import { useLocation, useNavigate } from "react-router-dom";
import BrandCard from "../components/BrandCard"
import { useState, useEffect } from "react"
import type { Brand } from "../types/Brand";
import useFetch from "../hooks/useFetch";
import type {Supplement} from "../types/Supplement";


export default function ProductCatalog() {
    const [currentImage, setCurrentImage] = useState(0);
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [showNotification, setShowNotification] = useState(false);

    const { get } = useFetch("http://localhost:8080/api/supplement/");
    const navigate = useNavigate();


    const location = useLocation();
    const brand: Brand = location.state?.brand;


    useEffect(() => {
        get(`getSupplements?brandId=${brand.id}`).then((data: Supplement[]) => {
            setSupplements(data);
        }).catch((error) => {
            console.error("Error fetching supplements:", error);
        });
    }, []); 

    
    useEffect(() => {
        if (location.state?.supplementSubmitted) {
            setShowNotification(true);
            navigate(location.pathname, { replace: true, state: { ...location.state, supplementSubmitted: undefined } });
            setTimeout(() => setShowNotification(false), 3000);
        }
    }, [location.state, navigate, location.pathname]);



    const images = [
        "https://via.placeholder.com/1200x300/10b981/ffffff?text=Revolution+Nutrition",
        "https://via.placeholder.com/1200x300/059669/ffffff?text=Revolution+Nutrition",
        "https://via.placeholder.com/1200x300/047857/ffffff?text=Revolution+Nutrition"
    ]

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

    const HandleAddSupplementClick = () => {
        navigate('/product/add-supplement', { state: { brand: brand } });
    }

    return (   
        <div className="min-h-screen to-white">
        {showNotification && (
                    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-semibold">Supplement Submitted</span>
                        </div>
                    </div>
            )}
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
                    
                    <select className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer">
                            <option value="">Sort By</option>
                            <option value="highest-rated">Highest Rated</option>
                            <option value="most-reviews">Most Reviews</option>
                            <option value="a-z">A-Z</option>
                        </select>
                    
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
                    Can't find what you're looking for? <button className="text-emerald-600 hover:text-emerald-700 font-semibold underline cursor-pointer" onClick={HandleAddSupplementClick}>Add a supplement here</button>
                </div>

                <div className="flex flex-col gap-4">
                    {supplements.map((supplement, index) => (
                    <BrandCard 
                        key={index}
                        id={supplement.id}
                        supplementName={supplement.supplementName}
                        imageUrl={supplement.imageUrl}
                        averageRating={supplement.averageRating}
                        totalReviews={supplement.totalReviews}
                        brand={brand.brandName}
                        category={supplement.category}
                    />
                    ))}
                </div>
            </div>
        </div>
    )
}