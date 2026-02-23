export interface Cart {
  productId: string;
  name: string;
  imageUrl: string;

  price: number;
  originalPrice: number;
  quantity: number;
  subtotal: number;

  variantId?: number;
  variantName?: string;
}
