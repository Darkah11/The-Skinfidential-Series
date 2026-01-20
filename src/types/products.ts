export interface Product {
  name: string;
  slug?: string;
  price: number;
  description: string;
  categories: string[];
  tags: string[];
  stock: number;
  image?: File;
  createdAt?: string;
  imageUrl?: string;
}
export type ProductWithId = Product & {
  id: string;
  slug: string;
};
export type ProductWithQuantity = ProductWithId & {
  quantity: number;
  subtotal: number;
};

export interface Category {
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
export type CategoryWithId = Category & {
  id: string;
};
export interface image {
  name?: string;
  type?: string;
  size?: number;
}
