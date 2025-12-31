import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import type { Supplement } from "../types/Supplement";
import type { Review } from "../types/Review";
import ReviewStrip from "../components/ReviewStrip";
import type { Tag } from "../types/Tag";
import Carousel from "../components/Carousel";

export default function ProductPage() {
    const [supplement, setSupplement] = useState<Supplement>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [variants, setVariants] = useState<string[]>([]);  
    const [showNotification, setShowNotification] = useState(false);
    const [sortOption, setSortOption] = useState<"recent" | "highest" | "lowest">("recent");
    const [variant, setVariant] = useState<string>("");
    const [tags, setTag] = useState<Tag[]>([]);
    const [limit, setLimit] = useState<number>(5); 
    const [recommendations, setRecommendations] = useState<Supplement[]>([]);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const brandName = typeof location.state?.brandName === 'string' 
        ? location.state.brandName 
        : location.state?.brand?.brandName || supplement?.brand?.brandName || "Product";
    
    const supplementId: number = location.state?.supplementId; 
  
    const {get} = useFetch("http://localhost:8080/api/");

    useEffect(() => {
        if (!supplementId) return;

        get(`supplement/getSupplement?supplementId=${supplementId}`).then((data) => {
            setSupplement(data);
        });
    }, [supplementId]);

    useEffect(() => {
        if (!supplementId) return;

        get(`supplement/getVariants?supplementId=${supplementId}`).then((data) => {
            setVariants(data || []);
        });
    }, [supplementId]);

    useEffect(() => {
        if (!supplementId) return;

        get(`tag/bySupplement?supplementId=${supplementId}`).then((data) => {
            setTag(data || []);
        });
    }, [supplementId]);

    useEffect(() => {
        if (!supplementId) return;

        get(`supplement/recommendations?supplementId=${supplementId}`).then((data) => {
            setRecommendations(data || []);
        });
    }, [supplementId]);
    
    useEffect(() => {
        if (!supplementId) return;

        let orderBy: string = "";
        let sort: string = "";
        
        if (sortOption === "highest") {
            orderBy = "desc";
            sort = "rating";
        }
        else if (sortOption === "lowest") {
            orderBy = "asc";
            sort = "rating";
        }
        else if (sortOption === "recent") {
            sort = "date";
            orderBy = "desc";
        }

        get(`review/getReviews?supplementId=${supplementId}&sortBy=${sort}&sortOrder=${orderBy}&variant=${variant}&limit=${limit}`).then((data: Review[]) => {
            setReviews(data || []);
        });
    }, [supplementId, sortOption, variant, limit]);

    useEffect(() => {
        if (location.state?.reviewSubmitted) {
            setShowNotification(true);
            navigate(location.pathname, { replace: true, state: { ...location.state, reviewSubmitted: undefined } });
            const timer = setTimeout(() => setShowNotification(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [location.state, navigate, location.pathname]);

    const HandleReviewClick = () => {
        navigate('/add-review', { 
            state: { 
                supplementId, 
                brandName: brandName, 
                supplementName: supplement?.supplementName, 
                imageUrl: supplement?.imageUrl, 
                variants: variants  
            } 
        });
    }

    const handleLoadMore = () => {
        setLimit(prev => prev + 5);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getRatingBgColor = (rating: number, totalReviews: number) => {
        if (totalReviews === 0) return 'bg-gray-400';
        if (rating <= 2) return 'bg-gradient-to-br from-red-400 to-red-500';
        if (rating <= 3) return 'bg-gradient-to-br from-yellow-400 to-yellow-500';
        return 'bg-gradient-to-br from-emerald-400 to-emerald-500';
    }

    const getRatingLabel = (rating: number, totalReviews: number) => {
        if (totalReviews === 0) return "No Ratings Yet";
        if (rating <= 2) return "Poor Rating";
        if (rating <= 3) return "Average Rating";
        return "Great Rating";
    }

    const getRatingDistribution = () => {
        const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        if (!Array.isArray(reviews)) return distribution;
        reviews.forEach((review) => {
            const rating = Math.floor(review.rating);
            if (rating >= 1 && rating <= 5) distribution[rating]++;
        });
        return distribution;
    };

    const ratingDistribution = getRatingDistribution();
    const totalReviewCount = reviews.length;

    return (
        <div className="min-h-screen to-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {showNotification && (
                    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-semibold">Review Submitted</span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    <div>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
                            <img 
                                src={supplement?.imageUrl} 
                                alt="Product" 
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-4">
                            <a onClick={() => navigate(`/products/${brandName}`, { state: { brandName } })} className="text-emerald-600 hover:text-emerald-700 font-semibold mb-2 inline-block cursor-pointer">
                                {brandName}
                            </a>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                {supplement?.supplementName}
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={`${getRatingBgColor(supplement?.averageRating ?? 0, supplement?.totalReviews ?? 0)} rounded-lg px-4 py-2 shadow-md`}>
                                        <span className="text-3xl font-bold text-white">{(supplement?.averageRating ?? 0).toFixed(1)}</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-700">
                                            {getRatingLabel(supplement?.averageRating ?? 0, supplement?.totalReviews ?? 0)}
                                        </div>
                                        <div className="text-xs text-gray-500">Based on {supplement?.totalReviews ?? 0} reviews</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <h3 className="font-bold text-lg mb-4">Product Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <span className="font-semibold">{supplement?.category || "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Serving Sizes:</span>
                                    <span className="font-semibold">
                                        {(() => {
                                            const data = supplement as any;
                                            const val = data?.servingSizes || data?.serving_sizes || data?.serving_size;
                                            if (!val) return "N/A";
                                            return Array.isArray(val) ? val.join(", ") : val;
                                        })()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Flavors:</span>
                                    <span className="font-semibold">
                                        {variants.length > 0 
                                            ? variants.join(", ") 
                                            : "No variants listed"}
                                    </span>
                                </div>

                             <div className="flex justify-between">
                                    <span className="text-gray-600">Tags :</span>
                                <div className="flex gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag.id} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        </div>
                    

                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg mb-4 cursor-pointer" onClick={HandleReviewClick}>
                            Leave a Review
                        </button>
                        
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="flex items-center justify-between mb-6 flex-col gap-3 sm:flex-row sm:gap-4">
                        <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
                        <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:gap-4 items-center">
                            <select
                                className="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer"
                                value={sortOption}
                                onChange={e => { setSortOption(e.target.value as any); setLimit(5); }}
                            >
                                <option value="recent">Most Recent</option>
                                <option value="highest">Highest Rated</option>
                                <option value="lowest">Lowest Rated</option>
                            </select>
                            <select
                                className="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer"
                                value={variant}
                                onChange={e => { setVariant(e.target.value); setLimit(5); }}
                            >
                                <option value="">Filter by Flavor</option>
                                {variants.map((v, idx) => (
                                    <option key={idx} value={v}>{v}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {supplement?.totalReviews === 0 ? (
                        <div className="text-center text-emerald-600 text-lg py-12 font-semibold cursor-pointer hover:underline" onClick={HandleReviewClick}>
                            Be the first to leave a review
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 pb-8 border-b">
                                {[5, 4, 3, 2, 1].map((stars) => {
                                    const count = ratingDistribution[stars];
                                    const percentage = totalReviewCount > 0 ? (count / totalReviewCount) * 100 : 0;
                                    return (
                                        <div key={stars} className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{stars}★</span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
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

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                {reviews.length < (supplement?.totalReviews || 0) && (
                                    <button 
                                        onClick={handleLoadMore}
                                        className="flex-1 py-3 border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors cursor-pointer"
                                    >
                                        Load More Reviews
                                    </button>
                                )}
                                <button 
                                    onClick={scrollToTop}
                                    className="px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    Back to Top
                                </button>
                            </div>
                            
                        </>
                    )}
                </div>
        {recommendations.length > 0 && (
    <Carousel 
    title={`${brandName} Users Have Also Enjoyed`}
        supplements={recommendations} />
        )}
            </div>
        </div>
    )
}