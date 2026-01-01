import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BrandCard from "../components/BrandCard";
import useDebounce from '../hooks/useDebounce';
import type { Brand } from "../types/Brand";
import useFetch from "../hooks/useFetch";
import type {Supplement} from "../types/Supplement";
import Load from "../components/Load";


export default function ProductCatalog() {
    const [currentImage, setCurrentImage] = useState(0);
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [showNotification] = useState(false);
    const [brand, setBrand] = useState<Brand>();

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filterOption, setFilterOption] = useState("");
    const [categories, setCategories] = useState<string[]>([]);


    const { get } = useFetch("http://localhost:8080/api/");
    
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const navigate = useNavigate();
    const location = useLocation();

    const locationBrand: Brand = location.state?.brand;
    const { brandName } = useParams<{ brandName: string }>();


  

    
      useEffect(() => {
        if (locationBrand) {
            setBrand(locationBrand);
        } else {
            const formattedBrandName = brandName ? brandName.replace(/-/g, " ") : "";
            get(`brand/getBrand?name=${encodeURIComponent(formattedBrandName)}`).then((data: Brand[]) => {
                console.log(data);
                setBrand(data[0]);
            }).catch((error) => {
                console.error("Error fetching brand:", error);
            });
        }
    }, []);


    useEffect(() => {
        if (!brand) return;

        let url = `getSupplements?brandId=${brand.id}`;

        if (debouncedSearchQuery.trim()) url += `&search=${debouncedSearchQuery.trim()}`;
        if (filterOption) url += `&filter=${filterOption}`;
        if (sortOption) url += `&sortOption=${sortOption}`;

        get(url)
            .then((data: Supplement[]) => setSupplements(data))
            .catch((error) => console.error("Error fetching supplements:", error));
    }, [debouncedSearchQuery, filterOption, sortOption]);

        useEffect(() => {
        get("getCategories")
            .then((data: string[]) => {
                setCategories(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
                setCategories([]);
            });
    }, []);


    const HandleAddSupplementClick = () => {
        if (!brand) return;
        navigate(`/product/add-supplement/${brand.id}`, { state: { brand } });
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setFilterOption("");
    };

    if (!brand) {
        return <div className="p-8 text-gray-500">Loading brand…</div>;
    }


    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

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

    if (!brand) return (
        <Load/>
    );

    const images = [brand!.imageUrl];
    
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
                        <div className="absolute inset-0 bg-black/65"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg text-center w-full break-words">{brand.brandName}</h1>
                            <div className="mt-2 flex items-center justify-center">
                                <span className="flex text-5xl sm:text-4xl">
                                    {renderStars(brand!.averageRating)}
                                </span>
                            </div>
                            <p className="mt-1 font-bold text-white drop-shadow-lg text-center w-full break-words">Based on {brand.totalReviews} reviews</p>
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
                                    className={`w-3 h-3 rounded-full transition-colors ${idx === currentImage ? 'bg-white' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex flex-col gap-3 items-center sm:flex-row sm:gap-3">
                    <input
                        type="text"
                        placeholder="Search for a supplement..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 max-w-md px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                    />

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer">
                        <option value="">Sort By</option>
                        <option value="highest-rated">Highest Rated</option>
                        <option value="most-reviews">Most Reviews</option>
                        <option value="a-z">A-Z</option>
                    </select>

                    <select
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors cursor-pointer"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6 text-sm text-gray-600">
                    Can't find what you're looking for? <button className="text-emerald-600 hover:text-emerald-700 font-semibold underline cursor-pointer" onClick={HandleAddSupplementClick}>Add a supplement here</button>
                </div>

                <div className="flex flex-col gap-4">
                    {supplements.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-800">No supplements found</h3>
                            <p className="text-gray-500 mt-1 mb-6">Try adjusting your search or filters.</p>
                            <button 
                                onClick={handleClearFilters}
                                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        supplements.map((supplement, index) => (
                            <BrandCard
                                key={index}
                                id={supplement.id}
                                supplementName={supplement.supplementName}
                                imageUrl={supplement.imageUrl}
                                averageRating={supplement.averageRating}
                                totalReviews={supplement.totalReviews}
                                brandId={supplement.brandId}
                                category={supplement.category}
                                variants={supplement.variants}
                                servingSizes={supplement.servingSizes}
                                brandName={brand!.brandName}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}