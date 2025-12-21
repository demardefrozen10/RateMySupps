import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import type { Supplement } from "../types/Supplement";
import type { Review } from "../types/Review";
import ReviewStrip from "../components/ReviewStrip";
export default function ProductPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [supplement, setSupplement] = useState<Supplement>();
    const [reviews, setReviews] = useState<Review[]>([]);
    

    const navigate = useNavigate();
    const location = useLocation();

    const supplementId: number = location.state?.supplementId; 
    const brandName: string = location.state?.brandName;



    const {get} = useFetch("http://localhost:8080/api/");


    useEffect(() => {
        get(`supplement/getSupplement?supplementId=${supplementId}`).then((data) => {
            setSupplement(data);
        });
    }, []);


    useEffect(() => {
        get(`review/getReviews?supplementId=${supplementId}`).then((data) => {
            setReviews(data);
        });
    }, [])

    console.log(reviews);

    
    const productImages = [
        "https://via.placeholder.com/500x500/10b981/ffffff?text=Product+Image+1",
        "https://via.placeholder.com/500x500/059669/ffffff?text=Product+Image+2",
        "https://via.placeholder.com/500x500/047857/ffffff?text=Product+Image+3"
    ]



    const HandleReviewClick = () => {
        navigate('/add-review');
    }

    const getRatingBgColor = (rating: number, totalReviews: number) => {
        if (totalReviews === 0) return 'bg-gray-400';
        if (rating <= 2) return 'bg-gradient-to-br from-red-400 to-red-500';
        if (rating <= 3) return 'bg-gradient-to-br from-yellow-400 to-yellow-500';
        return 'bg-gradient-to-br from-emerald-400 to-emerald-500';
    }

    const getRatingDistribution = () => {
        const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach((review) => {
            const rating = Math.floor(review.rating);
            if (rating >= 1 && rating <= 5) {
                distribution[rating]++;
            }
        });
        return distribution;
    };

    const ratingDistribution = getRatingDistribution();
    const totalReviewCount = reviews.length;

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
                                {brandName}
                            </a>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                {supplement?.supplementName}
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={`${getRatingBgColor(supplement?.averageRating ?? 0, supplement?.totalReviews ?? 0)} rounded-lg px-4 py-2 shadow-md`}>
                                        <span className="text-3xl font-bold text-white">{supplement?.averageRating?.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-700">No Reviews Yet</div>
                                        <div className="text-xs text-gray-500">Based on {supplement?.totalReviews} reviews</div>
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
                            </div>
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg mb-4" onClick={HandleReviewClick}>
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
                        {[5, 4, 3, 2, 1].map((stars) => {
                            const count = ratingDistribution[stars];
                            const percentage = totalReviewCount > 0 ? (count / totalReviewCount) * 100 : 0;
                            return (
                                <div key={stars} className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{stars}★</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-emerald-500 h-2 rounded-full" 
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-500">{count}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="space-y-6">
                        {reviews.map((review) => (
                           <ReviewStrip key={review.id} {...review} />
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