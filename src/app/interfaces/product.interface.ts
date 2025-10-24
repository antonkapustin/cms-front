export interface Product {
  id?: number;
  title: string;
  description?: string;
  price: number;
  sales?: number;
  rating?: number;
  categoryId?: number;
  image?: string;
  code?: string;
  currency: string;
  createdAt?: string;
  updatedAt?: string;
}
