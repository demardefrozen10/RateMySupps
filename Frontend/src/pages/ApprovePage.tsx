import { useState, useEffect } from "react";
import { Lock, X, Plus, Trash2, Edit } from "lucide-react";
import useFetch from "../hooks/useFetch";
import type { Supplement } from "../types/Supplement";
import type { Review } from "../types/Review";
import type { Tag } from "../types/Tag";
import Load from "../components/Load";
import Error from "../components/Error";

const ADMIN_PASSWORD = "admin123"; 

interface EditSupplementState {
    variants: string[];
    servingSizes: string[];
    selectedTagIds: number[];
}

export default function ApprovePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState(false);
    
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [editingSupplementId, setEditingSupplementId] = useState<number | null>(null);
    const [editState, setEditState] = useState<EditSupplementState>({
        variants: [],
        servingSizes: [],
        selectedTagIds: []
    });
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [newVariant, setNewVariant] = useState("");
    const [newServingSize, setNewServingSize] = useState("");
    const [saving, setSaving] = useState(false);

    const { get, patch } = useFetch("http://localhost:8080/api/");

    useEffect(() => {
        if (!isAuthenticated) return;
        
        Promise.all([
            get("review/getNotApprovedReviews").catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
                return [];
            }),
            get("supplement/getNotApprovedSupplements").catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
                return [];
            }),
            get("tag/all").catch(() => {
                return [];
            })
        ]).then(([reviewsData, supplementsData, tagsData]) => {
            setReviews(reviewsData || []);
            setSupplements(supplementsData || []);
            setAvailableTags(tagsData || []);
            setLoading(false);
        });
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setAuthError(false);
        } else {
            setAuthError(true);
            setTimeout(() => setAuthError(false), 3000);
        }
    };

    const handleApproveSupplement = (supplementId: number) => {
        patch(`supplement/approveSupplement?supplementId=${supplementId}`)
            .then(() => {
                setSupplements(prev => prev.filter(s => s.id !== supplementId));
            })
            .catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
            });
    };

    const handleApproveReview = (reviewId: string) => {
        patch(`review/approveReview?reviewId=${reviewId}`)
            .then(() => {
                setReviews(prev => prev.filter(r => r.id !== reviewId));
            })
            .catch(() => {
                setError(true);
                setTimeout(() => setError(false), 3000);
            });
    };

    const openEditModal = (supplement: Supplement) => {
        setEditingSupplementId(supplement.id);
        setEditState({
            variants: supplement.variants || [],
            servingSizes: supplement.servingSizes || [],
            selectedTagIds: supplement.tags?.map(t => t.id) || []
        });
        setNewVariant("");
        setNewServingSize("");
    };

    const closeEditModal = () => {
        setEditingSupplementId(null);
        setEditState({ variants: [], servingSizes: [], selectedTagIds: [] });
    };

    const addVariant = () => {
        if (newVariant.trim()) {
            setEditState(prev => ({
                ...prev,
                variants: [...prev.variants, newVariant.trim()]
            }));
            setNewVariant("");
        }
    };

    const removeVariant = (index: number) => {
        setEditState(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };

    const addServingSize = () => {
        if (newServingSize.trim()) {
            setEditState(prev => ({
                ...prev,
                servingSizes: [...prev.servingSizes, newServingSize.trim()]
            }));
            setNewServingSize("");
        }
    };

    const removeServingSize = (index: number) => {
        setEditState(prev => ({
            ...prev,
            servingSizes: prev.servingSizes.filter((_, i) => i !== index)
        }));
    };

    const toggleTag = (tagId: number) => {
        setEditState(prev => ({
            ...prev,
            selectedTagIds: prev.selectedTagIds.includes(tagId)
                ? prev.selectedTagIds.filter(id => id !== tagId)
                : [...prev.selectedTagIds, tagId]
        }));
    };

    const handleSaveAndApprove = async () => {
        if (!editingSupplementId) return;
        setSaving(true);

        try {
            await patch(`supplement/updateSupplement?supplementId=${editingSupplementId}`, {
                variants: editState.variants,
                servingSizes: editState.servingSizes,
                tagIds: editState.selectedTagIds
            });

            await patch(`supplement/approveSupplement?supplementId=${editingSupplementId}`);
            
            setSupplements(prev => prev.filter(s => s.id !== editingSupplementId));
            closeEditModal();
        } catch {
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveOnly = async () => {
        if (!editingSupplementId) return;
        setSaving(true);

        try {
            await patch(`supplement/updateSupplement?supplementId=${editingSupplementId}`, {
                variants: editState.variants,
                servingSizes: editState.servingSizes,
                tagIds: editState.selectedTagIds
            });
            
            setSupplements(prev => prev.map(s => 
                s.id === editingSupplementId 
                    ? { 
                        ...s, 
                        variants: editState.variants, 
                        servingSizes: editState.servingSizes,
                        tags: availableTags.filter(t => editState.selectedTagIds.includes(t.id))
                    } 
                    : s
            ));
            closeEditModal();
        } catch {
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    const getEditingSupplement = () => supplements.find(s => s.id === editingSupplementId);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center px-4 pt-24">
                {authError && <Error />}
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-emerald-100 p-4 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Access</h1>
                        <p className="text-gray-600 text-sm mt-1">Enter password to continue</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors mb-4"
                        />
                        <button
                            type="submit"
                            disabled={!password.trim()}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) return <Load />;

    return (
        <>
            {error && <Error />}
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Approval Dashboard</h1>
                        <p className="text-gray-600">Review and approve pending supplements and reviews.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Pending Supplements ({supplements.length})
                            </h2>
                            {supplements.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No pending supplements</p>
                            ) : (
                                <div className="space-y-4">
                                    {supplements.map((supplement) => (
                                        <div key={supplement.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <img 
                                                    src={supplement.imageUrl} 
                                                    alt={supplement.supplementName}
                                                    className="w-16 h-16 max-w-16 max-h-16 object-cover rounded-lg flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-gray-800 truncate">{supplement.supplementName}</h3>
                                                    <p className="text-sm text-gray-600 truncate">Brand: {supplement.brandName}</p>
                                                    <p className="text-sm text-gray-600 truncate">Category: {supplement.category}</p>
                                                    {supplement.variants && supplement.variants.length > 0 && (
                                                        <p className="text-xs text-gray-500">Variants: {supplement.variants.length}</p>
                                                    )}
                                                    {supplement.tags && supplement.tags.length > 0 && (
                                                        <p className="text-xs text-gray-500">Tags: {supplement.tags.length}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <button 
                                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                                                    onClick={() => openEditModal(supplement)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button 
                                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                                                    onClick={() => handleApproveSupplement(supplement.id)}
                                                >
                                                    Approve
                                                </button>
                                                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Pending Reviews ({reviews.length})
                            </h2>
                            {reviews.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No pending reviews</p>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                                            <div className="mb-2">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-gray-800">{review.username || "Anonymous"}</span>
                                                    <span className="text-yellow-500 text-sm">{"★".repeat(Math.floor(review.rating))}</span>
                                                    <span className="text-xs text-gray-500">{review.rating}/5</span>
                                                </div>
                                                <p className="text-xs text-emerald-600 font-semibold mb-1">
                                                    Supplement: {(review as any).supplementName || "N/A"}
                                                </p>
                                                {review.variant && (
                                                    <p className="text-xs text-gray-600">Variant: {review.variant}</p>
                                                )}
                                            </div>
                                            <p className="text-gray-700 text-sm mb-3 line-clamp-3">{review.comment}</p>
                                            {review.imageUrls && review.imageUrls.length > 0 && (
                                                <div className="flex gap-2 mb-3 overflow-x-auto">
                                                    {review.imageUrls.slice(0, 3).map((url, idx) => (
                                                        <img 
                                                            key={idx}
                                                            src={url} 
                                                            alt={`Review ${idx + 1}`}
                                                            className="w-12 h-12 object-cover rounded flex-shrink-0"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex gap-2">
                                                <button 
                                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                                                    onClick={() => handleApproveReview(review.id)}
                                                >
                                                    Approve
                                                </button>
                                                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Supplement Modal */}
            {editingSupplementId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">
                                Edit: {getEditingSupplement()?.supplementName}
                            </h2>
                            <button 
                                onClick={closeEditModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Variants Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Variants</h3>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={newVariant}
                                        onChange={(e) => setNewVariant(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addVariant())}
                                        placeholder="Add a variant (e.g., Chocolate, Vanilla)"
                                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
                                    />
                                    <button
                                        onClick={addVariant}
                                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {editState.variants.map((variant, index) => (
                                        <span 
                                            key={index} 
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                                        >
                                            {variant}
                                            <button 
                                                onClick={() => removeVariant(index)}
                                                className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    {editState.variants.length === 0 && (
                                        <span className="text-gray-400 text-sm">No variants added</span>
                                    )}
                                </div>
                            </div>

                            {/* Serving Sizes Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Serving Sizes</h3>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={newServingSize}
                                        onChange={(e) => setNewServingSize(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addServingSize())}
                                        placeholder="Add a serving size (e.g., 30 servings, 60 servings)"
                                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
                                    />
                                    <button
                                        onClick={addServingSize}
                                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {editState.servingSizes.map((size, index) => (
                                        <span 
                                            key={index} 
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                        >
                                            {size}
                                            <button 
                                                onClick={() => removeServingSize(index)}
                                                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    {editState.servingSizes.length === 0 && (
                                        <span className="text-gray-400 text-sm">No serving sizes added</span>
                                    )}
                                </div>
                            </div>

                            {/* Tags Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableTags.map((tag) => (
                                        <button
                                            key={tag.id}
                                            onClick={() => toggleTag(tag.id)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                editState.selectedTagIds.includes(tag.id)
                                                    ? 'bg-purple-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {tag.name}
                                        </button>
                                    ))}
                                    {availableTags.length === 0 && (
                                        <span className="text-gray-400 text-sm">No tags available</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
                            <button
                                onClick={closeEditModal}
                                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveOnly}
                                disabled={saving}
                                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleSaveAndApprove}
                                disabled={saving}
                                className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors"
                            >
                                {saving ? 'Saving...' : 'Save & Approve'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}