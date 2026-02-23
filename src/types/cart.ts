export interface Cart {
  productId: string;
  name: string;
  imageUrl: string;

  price: number;
  originalPrice: number;
  quantity: number;
  subtotal: number;
  costPrice: number;

  variantId?: number;
  variantName?: string;
}
