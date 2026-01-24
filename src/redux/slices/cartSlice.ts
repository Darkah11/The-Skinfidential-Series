import { createSlice } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "@/types/products";
import { DeliveryWithId } from "@/types/delivery";

interface Billing {
  first_name: string;
  last_name: string;
  email: string;
  address_1: string;
  company?: string;
  country: string;
  state: string;
  phone: string;
  city: string;
}
interface CartState {
  cart: ProductWithQuantity[];
  billing: Billing;
  deliveryOption: Omit<DeliveryWithId, "id">;
}
const initialState: CartState = {
  cart: [],
  deliveryOption: {
    name: "",
    isActive: true,
    description: "",
    price: 0,
    order: 0,
  },
  billing: {
    first_name: "",
    last_name: "",
    email: "",
    address_1: "",
    company: "",
    country: "",
    state: "",
    phone: "",
    city: "",
  },
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.cart.push({ ...action.payload });
      }
    },
    clearCart: (state) => {
      state.cart = [];
      // state.totalQuantity = 0;
      // state.totalAmount = 0;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const itemToIncrement = state.cart.find(
        (item) => item.id === action.payload,
      );
      if (itemToIncrement) {
        if (itemToIncrement.quantity < itemToIncrement.stock) {
          itemToIncrement.quantity++;
        }
        itemToIncrement.subtotal =
          itemToIncrement.price * itemToIncrement.quantity;
        // itemToIncrement.total = itemToIncrement.price * itemToIncrement.quantity
      }
    },
    decrementQuantity: (state, action) => {
      const itemToDecrement = state.cart.find(
        (item) => item.id === action.payload,
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity--;
        itemToDecrement.subtotal =
          itemToDecrement.price * itemToDecrement.quantity;
        // itemToDecrement.total = itemToDecrement.price * itemToDecrement.quantity
        // }
      }
    },
    updateBilling: (state, action) => {
      state.billing = action.payload;
    },
    updateDeliveryOption: (state, action) => {
      state.deliveryOption = action.payload;
    },
  },
});
// export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, updateBilling } = cartSlice.actions;
export const {
  addToCart,
  removeFromCart,
  updateBilling,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  updateDeliveryOption,
} = cartSlice.actions;
export default cartSlice.reducer;
