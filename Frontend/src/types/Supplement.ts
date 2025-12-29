import type { Brand } from "./Brand";

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


}


export type { Supplement };