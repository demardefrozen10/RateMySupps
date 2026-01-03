import { useState } from "react";
import {useNavigate} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Error from "../components/Error";

export default function AddBrand() {
    const [brandName, setBrandName] = useState("");
    const [country, setCountry] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [error, setError] = useState(false);


    const {post} = useFetch("http://localhost:8080/api/");
    const navigate = useNavigate();

    const HandleBrandSubmit = () => {
        post("brand/createBrand", {
            brandName: brandName,
            country: country,
            websiteUrl: websiteUrl
        }).then(() => {
            navigate('/', {state: {brandSubmitted: true}});
        })
        .catch(() => {
            setError(true);
            setTimeout(() => setError(false), 3000);
        });
    };
     


    return (
        <>
        {error && <Error />}
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Add A Brand</h1>
                    <p className="text-gray-600">If you don't see a brand on our page you can make a request to add it.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="mb-8 pb-6 border-b">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-800">Brand Information</h2>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Brand Name <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-3">Enter the official name of the brand as seen on their official page.</p>
                        <input
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200"
                            value={brandName}
                            onChange={e => setBrandName(e.target.value)}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-3">Enter the country of origin for the brand.</p>
                        <input
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Brand Link <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-3">Enter the link to the brand's official site.</p>
                        <input
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200"
                            value={websiteUrl}
                            onChange={e => setWebsiteUrl(e.target.value)}
                        />
                    </div>
                
                    
   


                    <div className="flex gap-4">
                        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl transition-colors cursor-pointer" onClick={() => navigate(-1)}>
                        Cancel
                        </button>
                        <button 
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                            disabled={!websiteUrl.trim() || !brandName.trim()}
                            onClick={HandleBrandSubmit}
                        >
                            Submit Brand
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
