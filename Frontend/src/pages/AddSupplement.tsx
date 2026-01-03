import { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import type { Brand } from "../types/Brand";
import useFetch from "../hooks/useFetch";
import Load from "../components/Load";
import NotFound from "./NotFound";
import Error from "../components/Error";

export default function AddSupplement() {
    const [supplementName, setSupplementName] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [category, setCategory] = useState("Protein Powder");
    const [images, setImages] = useState<File[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [brand, setBrand] = useState<Brand | null>(null);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(false);


    const {post, get} = useFetch("http://localhost:8080/api/");
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        setBrand(location.state?.brand as Brand | null);
        setLoading(false);
    }, []);

    useEffect(() => {
    if (!brand) return;
    get("supplement/getCategories")
        .then((data: string[]) => setCategories(data))
        .catch(() =>{
            setError(true);
            setTimeout(() => setError(false), 3000);
        })
    }, [brand]);


    if (loading) {
        return <Load />;
    }

    if (!brand) {
        return <NotFound />;
    }


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setImages((prevImages) => [...prevImages, ...selectedFiles].slice(0, 3));
        }
    };

    
    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    }

    const HandleProductSubmit = async () => {
        const batchPayload = images.map((image) => ({
            fileName: image.name,
            contentType: image.type,
            fileSize: image.size,
            imageType: "ProductImages"
        }));

        let uploadedImageUrls: string[] = [];
        if (images.length > 0) {
            const data = await post("s3/presigned-url", batchPayload); 
            await Promise.all(
                images.map((image, idx) =>
                    fetch(data[idx].uploadUrl, {
                        method: "PUT",
                        headers: { "Content-Type": image.type },
                        body: image
                    }).catch(() =>{
                        setError(true);
                        setTimeout(() => setError(false), 3000);
                    })
                )
            );
            uploadedImageUrls = data.map((item: { publicUrl: string }) => item.publicUrl);
        }

        await post("supplement/createSupplement", {
            brandId: brand.id,
            productName: supplementName,
            category: category,
            websiteUrl: websiteUrl,
            imageUrl: uploadedImageUrls
          }).catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
          });

    navigate(`/products/${brand.brandName}`, {
      state: { brand, supplementSubmitted: true },
    });
  };



    return (
        <>
        {error && <Error />}
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Add A Supplement</h1>
                    <p className="text-gray-600">If you don't see a supplement on our page you can make a request to add it.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="mb-8 pb-6 border-b">
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="text-md text-emerald-600 font-semibold">{brand.brandName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Supplement Name <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-3">Enter the official name of the supplement as seen on their official page.</p>
                        <input
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200"
                            value={supplementName}
                            onChange={e => setSupplementName(e.target.value)}
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Product Link <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-3">Enter the link to the product on the supplement's official site.</p>
                        <input
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200"
                            value={websiteUrl}
                            onChange={e => setWebsiteUrl(e.target.value)}
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Variant <span className="text-red-500">*</span>
                        </label>

                    



                        <select
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        >
                        {categories.length > 0
                            ? categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)
                            : <option value="Protein Powder">Protein Powder</option> // fallback
                        }
                        </select>



                    </div>
                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Add Photos (Optional)
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                            Upload up to 3 images of the supplement.
                        </p>
                        
                        {images.length < 3 && (
                            <label className="cursor-pointer">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-600">
                                        <span className="font-semibold text-emerald-600">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}

                        {images.length > 0 && (
                            <div className="grid grid-cols-5 gap-3 mt-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Upload ${index + 1}`}
                                            className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="flex gap-4">
                        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl transition-colors cursor-pointer" onClick={() => navigate(-1)}>
                        Cancel
                        </button>
                        <button 
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                            disabled={!websiteUrl.trim() || !supplementName.trim()}
                            onClick={HandleProductSubmit}
                        >
                            Submit Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}