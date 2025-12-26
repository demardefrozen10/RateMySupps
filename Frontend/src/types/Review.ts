
interface Review {
    id: string;
    comment: string;
    rating: number;
    username: string;
    imageUrls: string[];
    createdAt: string;
    helpful: number;
}

export type { Review };