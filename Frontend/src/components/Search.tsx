import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import type { Brand } from '../types/Brand';
import type { Supplement } from '../types/Supplement';
import Powder from '../assets/powder1.jpg';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ brands: Brand[], supplements: Supplement[] }>({ 
        brands: [], 
        supplements: [] 
    });
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { get } = useFetch("http://localhost:8080/api/");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setShowDropdown(true);
    };

    const handleBrandClick = (brand: Brand) => {
        navigate(`/products/${brand.brandName}`, { state: { brand } });
        setShowDropdown(false);
        setSearchQuery('');
    };

    const handleProductClick = (supplement: Supplement) => {
        navigate(`/product/${supplement?.brandName}/${supplement.supplementName}/${supplement.id}`, { state: { supplement} });
        setShowDropdown(false);
        setSearchQuery('');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!debouncedSearchQuery.trim() || debouncedSearchQuery.trim().length < 2) {
            setResults({ brands: [], supplements: [] });
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const [brandsData, supplementsData] = await Promise.all([
                    get(`brand/getBrandByName?name=${debouncedSearchQuery}`), 
                    get(`supplement/searchByName?name=${debouncedSearchQuery}`)
                ]);
                setResults({
                    brands: brandsData || [],
                    supplements: supplementsData || []
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [debouncedSearchQuery]);

    const hasResults = results.brands.length > 0 || results.supplements.length > 0;

    return (
        <div 
        className="relative w-full min-h-[55vh] flex flex-col items-center justify-center px-4 py-20 overflow-visible font-sans"
            style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${Powder})`,
                backgroundPosition: 'center 25%',
                backgroundSize: 'cover'
            }}
        >
            <div className="max-w-4xl w-full text-center space-y-10 relative z-50">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
                        Real Reviews. <span className="text-emerald-400">Verified Buyers.</span>
                    </h2>
                    <p className="text-lg text-gray-200 font-medium max-w-xl mx-auto opacity-90">
                        Search thousands of supplement brands and products.
                    </p>
                </div>
                
                <div className="relative max-w-2xl mx-auto w-full" ref={dropdownRef}>
                    <div className="relative flex items-center group">
                        <div className="absolute left-5 text-gray-400">
                            <SearchIcon size={20} />
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery}
                            placeholder="Search brands or products..." 
                            className="w-full pl-14 pr-32 py-5 text-lg rounded-2xl shadow-2xl focus:outline-none text-gray-900 bg-white border-none transition-all placeholder:text-gray-400 font-medium"
                            onChange={handleChange}
                            onFocus={() => hasResults && setShowDropdown(true)}
                        />
                        <button className="absolute right-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-xl font-bold transition-all shadow-lg">
                            Search
                        </button>
                    </div>

                    {showDropdown && (
                        <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-100">
                            <div className="max-h-[420px] overflow-y-auto">
                                
                                {loading && (
                                    <div className="p-10 text-center flex flex-col items-center gap-3">
                                        <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                                        <span className="text-sm font-medium text-gray-400 tracking-wide uppercase">Searching...</span>
                                    </div>
                                )}

                                {!loading && !hasResults && debouncedSearchQuery && (
                                    <div className="text-center py-12">
       <h3 className="text-xl font-semibold text-gray-800 mb-2">
    No results found for "{searchQuery}"
</h3>
<p className="text-gray-600 mb-6">
    Can't find what you're looking for?
</p>
<div className="flex flex-col gap-3 items-center">
    <button 
        onClick={() => {
            navigate('/add-brand');
            setShowDropdown(false);
            setSearchQuery('');
        }}
        className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-semibold"
    >
        Request to Add This Brand
    </button>
    <p className="text-sm text-gray-500">
        Looking for a specific product? Try searching for the brand first.
    </p>
</div>
    </div>
                                )}

                                {!loading && hasResults && (
                                    <div className="divide-y divide-gray-50">
                                        
                                        {results.brands.length > 0 && (
                                            <div className="text-left">
                                                <div className="px-6 py-3 bg-gray-50/80 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                                    Brands
                                                </div>
                                                {results.brands.map((brand) => (
                                                    <div 
                                                        key={brand.id}
                                                        onClick={() => handleBrandClick(brand)}
                                                        className="px-6 py-4 hover:bg-emerald-50 cursor-pointer font-semibold text-gray-900 transition-colors"
                                                    >
                                                        {brand.brandName}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {results.supplements.length > 0 && (
                                            <div className="text-left">
                                                <div className="px-6 py-3 bg-gray-50/80 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100">
                                                    Products
                                                </div>
                                                {results.supplements.map((supplement) => (
                                                    <div 
                                                        key={supplement.id}
                                                        onClick={() => handleProductClick(supplement)}
                                                        className="px-6 py-4 hover:bg-emerald-50 cursor-pointer font-semibold text-gray-900 transition-colors"
                                                    >
                                                        {supplement.supplementName}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}