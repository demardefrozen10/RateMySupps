import Powder from '../assets/powder1.jpg';
import { useState, useEffect, useRef } from 'react';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import type { Brand } from '../types/Brand';
import type { Supplement } from '../types/Supplement';
import { useNavigate } from 'react-router-dom';

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
    }

    const handleBrandClick = (brand: Brand) => {
        navigate(`/products/${brand.id}`, { state: { brand } });
        setShowDropdown(false);
        setSearchQuery('');
    }

    const handleProductClick = (supplement: Supplement) => {
        navigate(`/product/${supplement.id}`, { state: { supplement } });
        setShowDropdown(false);
        setSearchQuery('');
    }

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
        if (!debouncedSearchQuery.trim()) {
            setResults({ brands: [], supplements: [] });
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const [brandsData, supplementsData] = await Promise.all([
                    get(`brand/getBrand?name=${debouncedSearchQuery}`),
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
            className="relative w-full min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
            style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${Powder})`,
                backgroundPosition: 'center 25%',
                backgroundSize: 'cover'
            }}
        >
            <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
                {/* Hero Text */}
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl text-white font-extrabold tracking-tight drop-shadow-md">
                        Real Reviews. <span className="text-emerald-400">Verified Buyers.</span>
                    </h2>
                    <p className="text-lg text-gray-200 font-medium max-w-2xl mx-auto">
                        Search thousands of supplement brands and products to find what actually works.
                    </p>
                </div>
                
                {/* Search Bar Container */}
                <div className="relative max-w-3xl mx-auto w-full" ref={dropdownRef}>
                    <div className="relative flex items-center group">
                        <div className="absolute left-6 text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery}
                            placeholder="Search brands or products..." 
                            className="w-full pl-16 pr-36 py-6 text-lg rounded-2xl shadow-2xl focus:ring-4 focus:ring-emerald-500/20 focus:outline-none text-gray-900 bg-white border-none"
                            onChange={handleChange}
                            onFocus={() => hasResults && setShowDropdown(true)}
                        />
                        <button className="absolute right-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg">
                            Search
                        </button>
                    </div>

                    {/* Improved Dropdown Results */}
                    {showDropdown && (
                        <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                                {loading && (
                                    <div className="p-10 text-center flex flex-col items-center gap-3">
                                        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Searching...</span>
                                    </div>
                                )}
                                
                                {error && (
                                    <div className="p-6 text-center text-red-500 font-medium bg-red-50">
                                        {error}
                                    </div>
                                )}
                                
                                {!loading && !error && !hasResults && debouncedSearchQuery && (
                                    <div className="p-10 text-center text-gray-500">
                                        No matches found for <span className="font-bold text-gray-800">"{debouncedSearchQuery}"</span>
                                    </div>
                                )}
                                
                                {!loading && !error && hasResults && (
                                    <div className="divide-y divide-gray-50">
                                        {/* Brands Section */}
                                        {results.brands.length > 0 && (
                                            <div>
                                                <div className="px-5 py-3 bg-gray-50/80 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                                    Brands
                                                </div>
                                                <ul>
                                                    {results.brands.map((brand) => (
                                                        <li 
                                                            key={brand.id}
                                                            onClick={() => handleBrandClick(brand)}
                                                            className="px-6 py-4 hover:bg-emerald-50 cursor-pointer transition-colors group flex items-center justify-between"
                                                        >
                                                            <div className="text-left">
                                                                <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                                    {brand.brandName}
                                                                </div>
                                                                {brand.description && (
                                                                    <div className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                                                                        {brand.description}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <svg className="w-4 h-4 text-gray-300 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Products Section */}
                                        {results.supplements.length > 0 && (
                                            <div>
                                                <div className="px-5 py-3 bg-gray-50/80 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                                    Products
                                                </div>
                                                <ul>
                                                    {results.supplements.map((supplement) => (
                                                        <li 
                                                            key={supplement.id}
                                                            onClick={() => handleProductClick(supplement)}
                                                            className="px-6 py-4 hover:bg-emerald-50 cursor-pointer transition-colors group flex items-center justify-between"
                                                        >
                                                            <div className="text-left">
                                                                <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                                    {supplement.supplementName}
                                                                </div>
                                                                <div className="text-xs text-emerald-600 font-semibold mt-0.5 uppercase tracking-wide">
                                                                    Product
                                                                </div>
                                                            </div>
                                                            <svg className="w-4 h-4 text-gray-300 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </li>
                                                    ))}
                                                </ul>
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