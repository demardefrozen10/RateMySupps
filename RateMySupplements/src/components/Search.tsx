import Powder from '../assets/powder1.jpg';
import {useState} from 'react';
export default function Search() {
    const [searchByName, setSearchByName] = useState(false);
    
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
                
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder={searchByName ? "Search for a supplement name..." : "Search for a supplement brand..."} 
                        className="w-full max-w-3xl px-6 py-4 rounded-full border-2 border-emerald-300 focus:border-emerald-500 placeholder:text-white"        
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                        Search
                    </button>
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