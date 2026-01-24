export interface Delivery {
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  order: number;
}
export type DeliveryWithId = Delivery & {
  id: string;
};