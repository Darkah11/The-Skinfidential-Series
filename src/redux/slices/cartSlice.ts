import { createSlice } from "@reduxjs/toolkit";
import { ProductWithId, ProductWithQuantity } from "@/types/products";


interface Billing {
    first_name: string,
    last_name: string,
    email: string,
    address_1: string,
    address_2?: string,
    company?: string,
    country: string,
    state: string,
    phone: string,
    city: string,
}
interface CartState {
  cart: ProductWithQuantity[];
  billing: Billing;
}
const initialState: CartState = { cart: [], billing: {
    first_name: "",
    last_name: "",
    email: "",
    address_1: "",
    address_2: "",
    company: "",
    country: "",
    state: "",
    phone: "",
    city: "",
  }};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) {
      state.cart.push({...action.payload});
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
        (item) => item.id === action.payload
      );
      if (itemToIncrement) {
        itemToIncrement.quantity++;
        itemToIncrement.subtotal = itemToIncrement.price * itemToIncrement.quantity
        // itemToIncrement.total = itemToIncrement.price * itemToIncrement.quantity
      }
    },
    decrementQuantity: (state, action) => {
      const itemToDecrement = state.cart.find(
        (item) => item.id === action.payload
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
          itemToDecrement.quantity--;
          itemToDecrement.subtotal = itemToDecrement.price * itemToDecrement.quantity
        // itemToDecrement.total = itemToDecrement.price * itemToDecrement.quantity
        // }
      }
    },
    updateBilling: (state, action) => {
      state.billing = action.payload
    }
  },
});
// export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, updateBilling } = cartSlice.actions;
export const { addToCart, removeFromCart, updateBilling, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;