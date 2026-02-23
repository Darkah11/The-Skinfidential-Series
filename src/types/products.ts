export interface ProductDiscount {
  type: "percentage" | "fixed";
  value: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price: number;
  costPrice: number;
  stock: number;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  categories: string[];
  tags: string[];
  image?: File;
  createdAt?: string;
  imageUrl?: string;
  costPrice: number;
  imagePublicId?: string;

  discount: ProductDiscount;
  hasVariants: boolean;
  variants?: ProductVariant[];
  stock: number;
}
export type ProductWithId = Product & {
  id: string;
  slug?: string;
};
export type ProductWithQuantity = ProductWithId & {
  quantity: number;
  subtotal: number;
  variantId?: string;
  originalPrice?: number;
  selectedVariant?: {
    id: string;
    name: string;
    attributes: { [key: string]: string };
    sku?: string;
  };
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
