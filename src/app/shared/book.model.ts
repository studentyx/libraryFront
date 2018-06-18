export interface Book {
    _id?: string;
    title: string;
    image: string;
    description?: string;
    genre?: string[];
    tags?: string [];
    author?: string;
    rating?: number;
}
