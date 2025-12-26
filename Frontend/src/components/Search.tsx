import Powder from '../assets/powder1.jpg';
import {useState, useEffect, useRef} from 'react';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import type { Brand } from '../types/Brand';

import { useNavigate } from 'react-router-dom';


export default function Search() {
    const [searchByName, setSearchByName] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Brand[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { get } = useFetch("http://localhost:8080/api/brand/");

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setShowDropdown(true);
    }

    const HandleResultClick = (result: Brand) => {
        navigate(`/products/${result.id}`, { state: { brand: result } });
        setShowDropdown(false);
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
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const data = await get(`getBrand?name=${debouncedSearchQuery}`);
                setResults(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedSearchQuery]);

    
    return (
        <div 
            className="w-full min-h-[45vh] flex flex-col items-center justify-center gap-8 px-4 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${Powder})`, backgroundPosition: 'center 25%' }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="max-w-4xl text-center space-y-8 relative z-10">
                <h2 className="text-xl text-white font-medium">
                    Authentic and Real Reviews of Supplements From Verified Buyers
                </h2>
                
                <div className="relative" ref={dropdownRef}>
                    <input 
                        type="text" 
                        value={searchQuery}
                        placeholder={searchByName ? "Search for a supplement name..." : "Search for a supplement brand..."} 
                        className="w-full max-w-3xl px-6 py-4 rounded-full border-2 border-emerald-300 focus:border-emerald-500 placeholder:text-white text-white"
                        onChange={handleChange}
                        onFocus={() => results.length > 0 && setShowDropdown(true)}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                        Search
                    </button>

                    {showDropdown && (
                        <div className="absolute top-full mt-2 w-full max-w-3xl bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
                            {loading && (
                                <div className="p-4 text-center text-gray-600">
                                    Loading...
                                </div>
                            )}
                            
                            {error && (
                                <div className="p-4 text-center text-red-600">
                                    {error}
                                </div>
                            )}
                            
                            {!loading && !error && results.length === 0 && debouncedSearchQuery && (
                                <div className="p-4 text-center text-gray-600">
                                    No results found
                                </div>
                            )}
                            
                            {!loading && !error && results.length > 0 && (
                                <ul className="divide-y divide-gray-200">
                                    {results.map((result, index) => (
                                        <li 
                                            key={index}
                                            onClick={() => HandleResultClick(result)}
                                            className="p-4 hover:bg-emerald-50 cursor-pointer transition-colors"
                                        >
                                            <div className="text-left">
                                                <div className="font-semibold text-gray-900">
                                                    {result.brandName}
                                                </div>
                                                {result.description && (
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {result.description}
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
                
                <button 
                    onClick={() => setSearchByName(!searchByName)}
                    className="text-emerald-300 hover:text-emerald-200 font-medium underline underline-offset-4 transition-colors"
                >
                    {searchByName ? "Search by supplement brand instead" : "Search by supplement name instead"}
                </button>
            </div>
        </div>
    );
}