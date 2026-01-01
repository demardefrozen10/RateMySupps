import type {Supplement} from "../types/Supplement";
import { useNavigate } from "react-router-dom";

export default function BrandCard(props: Supplement) {

    const navigate = useNavigate();


    const handleCardClick = () => {
        navigate(`/product/${props.brandName}/${props.supplementName}/${props.id}`, { state: { supplement: props } });
    }

    return (
        <div onClick={handleCardClick} className="flex items-center justify-between bg-white border-2 border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer">
            <div className="flex items-center gap-6">
                <div className="w-30 h-30 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                        src={props.imageUrl} 
                        alt="Brand Logo" 
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-gray-800 hover:text-emerald-600 transition-colors">
                        {props.supplementName}
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                        Quality
                    </span>
                    <div className={`rounded-lg px-4 py-2 shadow-md ${
                    props.totalReviews === 0 
                        ? 'bg-gray-400' 
                        : props.averageRating <= 2 
                            ? 'bg-gradient-to-br from-red-400 to-red-500'
                            : props.averageRating <= 3
                                ? 'bg-gradient-to-br from-yellow-400 to-yellow-500'
                                : 'bg-gradient-to-br from-emerald-400 to-emerald-500'
                    }`}>
                    <span className="text-3xl font-bold text-white">{(props.averageRating ?? 0).toFixed(1)}</span>
                </div>
                    <span className="text-xs text-gray-500 mt-2">{props.totalReviews} ratings</span>
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