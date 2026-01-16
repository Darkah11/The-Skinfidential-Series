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
};

export interface Category {
  name: string;
  description: string;
  id?: string;
}
export interface image {
  name?: string,
  type?: string;
  size?: number;
}