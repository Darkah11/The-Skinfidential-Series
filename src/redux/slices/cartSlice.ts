import { createSlice } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "@/types/products";
import { DeliveryWithId } from "@/types/delivery";
import { Billing } from "@/types/billing";

interface CartState {
  cart: ProductWithQuantity[];
  billing: Billing;
  deliveryOption: Omit<DeliveryWithId, "id">;
  total: number;
}
const initialState: CartState = {
  cart: [],
  total: 0,
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
    // addToCart: (state, action) => {
    //   const newItem = action.payload;
    //   const existingItem = state.cart.find((item) => item.id === newItem.id);
    //   if (!existingItem) {
    //     state.cart.push({ ...action.payload });
    //   }
    // },
    addToCart: (state, action) => {
      const newItem: ProductWithQuantity = action.payload;

      const existingItem = state.cart.find(
        (item) =>
          item.id === newItem.id && item.variantId === newItem.variantId,
      );
      if (!existingItem) {
        state.cart.push({ ...newItem });
      }
    },

    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
    removeFromCart: (state, action) => {
      const { id, variantId } = action.payload;

      state.cart = state.cart.filter(
        (item) => !(item.id === id && item.variantId === variantId),
      );
    },
    incrementQuantity: (state, action) => {
      const { id, variantId } = action.payload;

      const itemToIncrement = state.cart.find(
        (item) => item.id === id && item.variantId === variantId,
      );
      if (itemToIncrement) {
        itemToIncrement.quantity++;
        itemToIncrement.subtotal =
          itemToIncrement.price * itemToIncrement.quantity;
        // itemToIncrement.total = itemToIncrement.price * itemToIncrement.quantity
      }
    },
    decrementQuantity: (state, action) => {
      const { id, variantId } = action.payload;

      const itemToDecrement = state.cart.find(
        (item) => item.id === id && item.variantId === variantId,
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
    updateTotal: (state, action) => {
      state.total = action.payload;
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
  updateTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
