import type { Review } from "../types/Review";

export default function ReviewStrip(props: Review) {

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        return [...Array(5)].map((_, idx) => {
            if (idx < fullStars) {
                return <span key={idx} className="text-yellow-400">★</span>;
            } else if (idx === fullStars && hasHalfStar) {
                return (
                    <span key={idx} className="relative">
                        <span className="text-gray-300">★</span>
                        <span className="absolute left-0 top-0 overflow-hidden w-1/2 text-yellow-400">★</span>
                    </span>
                );
            } else {
                return <span key={idx} className="text-gray-300">★</span>;
            }
        });
    };

    const formatLocalDate = (isoDate?: string) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return <>        
            <div key={props.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-semibold text-emerald-700">Verified Purchase</span>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {renderStars(props.rating)}
                        </div>
                    </div>
                </div>
                <p className="font-semibold text-gray-900 mb-1">{props.username}</p>
                <p className="text-gray-700 mb-3">{props.comment}</p>
                {props.imageUrls && props.imageUrls.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {props.imageUrls.map((url, idx) => (
                            <div key={idx} className="flex flex-col items-start">
                                <img 
                                    src={url} 
                                    alt={`Review image ${idx + 1}`} 
                                    className="w-40 h-40 object-cover rounded-lg border border-gray-200"
                                />
                                {idx === 0 && (
                                    <span className="text-xs text-gray-500 mt-2">{formatLocalDate(props.createdAt)}</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {(!props.imageUrls || props.imageUrls.length === 0) && (
                    <span className="text-xs text-gray-500 mb-3 block">{formatLocalDate(props.createdAt)}</span>
                )}
                <div className="flex items-center gap-4 text-sm">
                    {/*
                    <button className="text-gray-500 hover:text-emerald-600 flex items-center gap-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Helpful (1)
                    </button>
                    */}
                </div>
            </div>
    </>
}