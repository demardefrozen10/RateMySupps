
interface Review {
    id: string;
    comment: string;
    rating: number;
    username: string;
    imageUrls: string[];
    date: string;
    helpful: number;
}

export type { Review };