interface Supplement {
    id: number;
    supplementName: string;
    averageRating: number;
    totalReviews: number;
    imageUrl: string;
    brand: string;
    category: string;
    variants: string[];
    servingSizes: string[];


}


export type { Supplement };