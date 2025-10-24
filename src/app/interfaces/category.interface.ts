import { Product } from "./product.interface";

export interface Category {
    categoryId: number;
    name: string;
    products?: Product[]
}