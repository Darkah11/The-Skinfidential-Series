import { Billing } from "./billing";
import { ProductWithQuantity } from "./products";

export interface order {
  amount: number;
  billing: Billing;
  cart: ProductWithQuantity[];
  createdAt: string;
  deliveryMethod: string;
  deliveryPrice: number;
  email: string;
  orderId: string;
  orderNumber: string;
  paymentAttemptId: string;
  paystackReference: string;
  status: 'paid' | 'cancelled' | 'completed';
  userId: string;
}

export type OrderWithId = order & {
  id: string;
};
