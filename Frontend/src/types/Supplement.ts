import type { Tag } from "./Tag";

interface Supplement {
    id: number;
    supplementName: string;
    averageRating: number;
    totalReviews: number;
    imageUrl: string;
    brandId: number;
    category: string;
    variants: string[];
    servingSizes: string[];
    brandName: string;
    tags: Tag[];
}


export type { Supplement };