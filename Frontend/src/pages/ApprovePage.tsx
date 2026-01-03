import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import useFetch from "../hooks/useFetch";
import type { Supplement } from "../types/Supplement";
import type { Review } from "../types/Review";
import Load from "../components/Load";
import Error from "../components/Error";

const ADMIN_PASSWORD = "admin123"; 

export default function ApprovePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState(false);
    
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { get, patch } = useFetch("http://localhost:8080/api/");

    useEffect(() => {
        if (!isAuthenticated) return;
        
        Promise.all([
            get("review/getNotApprovedReviews").catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
                return [];
            }),
            get("supplement/getNotApprovedSupplements").catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
                return [];
            })
        ]).then(([reviewsData, supplementsData]) => {
            setReviews(reviewsData || []);
            setSupplements(supplementsData || []);
            setLoading(false);
        });
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setAuthError(false);
        } else {
            setAuthError(true);
            setTimeout(() => setAuthError(false), 3000);
        }
    };

    const handleApproveSupplement = (supplementId: number) => {
        patch(`supplement/approveSupplement?supplementId=${supplementId}`)
            .then(() => {
                setSupplements(prev => prev.filter(s => s.id !== supplementId));
            })
            .catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
            });
    };

    const handleApproveReview = (reviewId: string) => {
        patch(`review/approveReview?reviewId=${reviewId}`)
            .then(() => {
                setReviews(prev => prev.filter(r => r.id !== reviewId));
            })
            .catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
            });
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center px-4 pt-24">
                {authError && <Error />}
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-emerald-100 p-4 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Access</h1>
                        <p className="text-gray-600 text-sm mt-1">Enter password to continue</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors mb-4"
                        />
                        <button
                            type="submit"
                            disabled={!password.trim()}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) return <Load />;

    return (
        <>
            {error && <Error />}
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Approval Dashboard</h1>
                        <p className="text-gray-600">Review and approve pending supplements and reviews.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Pending Supplements ({supplements.length})
                            </h2>
                            {supplements.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No pending supplements</p>
                            ) : (
                                <div className="space-y-4">
                                    {supplements.map((supplement) => (
                                        <div key={supplement.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <img 
                                                    src={supplement.imageUrl} 
                                                    alt={supplement.supplementName}
                                                    className="w-16 h-16 max-w-16 max-h-16 object-cover rounded-lg flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-gray-800 truncate">{supplement.supplementName}</h3>
                                                    <p className="text-sm text-gray-600 truncate">Brand: {supplement.brandName}</p>
                                                    <p className="text-sm text-gray-600 truncate">Category: {supplement.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <button 
                                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                                                    onClick={() => handleApproveSupplement(supplement.id)}
                                                >
                                                    Approve
                                                </button>
                                                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Pending Reviews ({reviews.length})
                            </h2>
                            {reviews.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No pending reviews</p>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                                            <div className="mb-2">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-gray-800">{review.username || "Anonymous"}</span>
                                                    <span className="text-yellow-500 text-sm">{"★".repeat(Math.floor(review.rating))}</span>
                                                    <span className="text-xs text-gray-500">{review.rating}/5</span>
                                                </div>
                                                <p className="text-xs text-emerald-600 font-semibold mb-1">
                                                    Supplement: {(review as any).supplementName || "N/A"}
                                                </p>
                                                {review.variant && (
                                                    <p className="text-xs text-gray-600">Variant: {review.variant}</p>
                                                )}
                                            </div>
                                            <p className="text-gray-700 text-sm mb-3 line-clamp-3">{review.comment}</p>
                                            {review.imageUrls && review.imageUrls.length > 0 && (
                                                <div className="flex gap-2 mb-3 overflow-x-auto">
                                                    {review.imageUrls.slice(0, 3).map((url, idx) => (
                                                        <img 
                                                            key={idx}
                                                            src={url} 
                                                            alt={`Review ${idx + 1}`}
                                                            className="w-12 h-12 object-cover rounded flex-shrink-0"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex gap-2">
                                                <button 
                                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                                                    onClick={() => handleApproveReview(review.id)}
                                                >
                                                    Approve
                                                </button>
                                                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}