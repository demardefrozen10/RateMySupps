import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import type { S3Request } from "../types/S3Request";
export default function AddReview() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    //const [wouldPurchaseAgain, setWouldPurchaseAgain] = useState<boolean | null>(null);
    const [review, setReview] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [proofOfPurchase, setProofOfPurchase] = useState<File | null>(null);
    const [anonymous, setAnonymous] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const supplementId: number = location.state?.supplementId;
    const brandName: string = location.state?.brandName;
    const supplementName: string = location.state?.supplementName;
    const imageUrl: string = location.state?.imageUrl;

    const {post} = useFetch("http://localhost:8080/api/");




    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const remainingSlots = 5 - images.length;
        const newImages = files.slice(0, remainingSlots);
        setImages([...images, ...newImages]);
    }

    const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProofOfPurchase(file);
        }
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    }

    const removeProof = () => {
        setProofOfPurchase(null);
    }

    const handleStarClick = (star: number, e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const isLeftHalf = clickX < rect.width / 2;
        setRating(isLeftHalf ? star - 0.5 : star);
    };

    const handleStarHover = (star: number, e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const hoverX = e.clientX - rect.left;
        const isLeftHalf = hoverX < rect.width / 2;
        setHoverRating(isLeftHalf ? star - 0.5 : star);
    };

    const renderStar = (star: number, currentRating: number) => {
        if (star <= currentRating) {
            return <span className="text-yellow-400">★</span>;
        } else if (star - 0.5 === currentRating) {
            return (
                <span className="relative inline-block">
                    <span className="text-gray-300">★</span>
                    <span className="absolute left-0 top-0 overflow-hidden text-yellow-400" style={{ width: '50%' }}>★</span>
                </span>
            );
        } else {
            return <span className="text-gray-300">★</span>;
        }
    };

const HandleSubmitReview = async () => {
    const batchPayload = images.map((image) => ({
        fileName: image.name,
        contentType: image.type,
        fileSize: image.size,
        imageType: "ReviewImages"
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
                })
            )
        );
        uploadedImageUrls = data.map((item: { publicUrl: string }) => item.publicUrl);
    }

    let proofS3Url: string = "";
    if (proofOfPurchase) {
        const response: any = await post("s3/presigned-url", [{
            fileName: proofOfPurchase.name,
            contentType: proofOfPurchase.type,
            fileSize: proofOfPurchase.size,
            imageType: "PurchaseImages"
        }]);
        await fetch(response[0].uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": proofOfPurchase.type },
            body: proofOfPurchase
        });
        proofS3Url = response[0].publicUrl;
    }

    await post("review/createReview", {
        username: name,
        supplementId: supplementId,
        rating: rating,
        comment: review,
        imageUrls: uploadedImageUrls,
        purchaseImageUrl: proofS3Url
    }).then(() => {
        const supplementId = location.state?.supplementId;
        const brandName = location.state?.brandName;
        navigate(`/product/${supplementId}`, { state: { supplementId, brandName, reviewSubmitted: true } });
    })
}


    

  

    return (
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Leave a Review</h1>
                    <p className="text-gray-600">Share your experience with this supplement.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="mb-8 pb-6 border-b">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg">
                                <img 
                                    src={imageUrl}
                                    alt="Product" 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-emerald-600 font-semibold">{brandName}</p>
                                <h3 className="text-xl font-bold text-gray-800">{supplementName}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Rate this Product <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={(e) => handleStarClick(star, e)}
                                    onMouseMove={(e) => handleStarHover(star, e)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="text-5xl transition-colors focus:outline-none"
                                >
                                    {renderStar(star, hoverRating || rating)}
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="mt-2 text-sm text-gray-600">
                                You rated this product {rating} out of 5 stars
                            </p>
                        )}
                    </div>
                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Your Name <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-3">Enter your name that will appear with your review, or you can remain anonymous.</p>
                        <input
                            className={`w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all${anonymous ? " bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            disabled={anonymous}
                        />
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                className="ml-1  text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500 accent-emerald-600"
                                checked={anonymous}
                                onChange={() => {
                                    setAnonymous(!anonymous);
                                    setName("");
                                }}
                            />
                            <p className="text-sm text-gray-600 mt-1">Remain anonymous</p>
                        </div>
                    </div>
                    {/*}
                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Would you purchase this product again? <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setWouldPurchaseAgain(true)}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                                    wouldPurchaseAgain === true
                                        ? "bg-emerald-500 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setWouldPurchaseAgain(false)}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                                    wouldPurchaseAgain === false
                                        ? "bg-red-500 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                    */}
                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Your Review <span className="text-red-500">*</span>
                            
                        </label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Share your experience with this product..."
                            className="w-full h-48 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all resize-none"
                            maxLength={200}
                        />
                        <div className="flex justify-between items-center mt-2">
                            
                            <p className="text-sm text-gray-500">
                                {review.length}/200 characters
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Proof of Purchase <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                            Upload a receipt or order confirmation to verify that you have purchased this product.
                        </p>
                        
                        {!proofOfPurchase ? (
                            <label className="cursor-pointer">
                                <div className="border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-lg p-6 text-center hover:border-emerald-500 hover:bg-emerald-100 transition-all">
                                    <svg className="mx-auto h-10 w-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-700">
                                        <span className="font-semibold text-emerald-600">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleProofUpload}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-gray-800">{proofOfPurchase.name}</p>
                                        <p className="text-xs text-gray-600">
                                            {(proofOfPurchase.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={removeProof}
                                    className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="block text-lg font-bold text-gray-800 mb-3">
                            Add Photos (Optional)
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                            Upload up to 5 images to support your review.
                        </p>
                        
                        {images.length < 5 && (
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

                    <div className="mb-8 bg-emerald-50 rounded-lg p-6">
                        <h4 className="font-bold text-gray-800 mb-3">Guidelines</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex gap-2">
                                <span className="text-emerald-600">•</span>
                                <span>Your rating could be removed if you use profanity or derogatory terms.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-emerald-600">•</span>
                                <span>Don't make false claims about the product or brand.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-emerald-600">•</span>
                                <span>Don't forget to proofread your review before submitting.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-emerald-600">•</span>
                                <span>Be honest and constructive in your feedback.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl transition-colors" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button 
                            disabled={!rating || !review.trim() || !proofOfPurchase}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                            onClick={HandleSubmitReview}
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}