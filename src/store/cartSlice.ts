import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../services/firestoreService";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  packSize?: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.packSize === action.payload.packSize
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Add new item
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state, 
      action: PayloadAction<{ id: string; quantity: number; size?: string; packSize?: string }>
    ) => {
      const { id, quantity, size, packSize } = action.payload;
      const item = state.items.find(
        (item) => 
          item.id === id && 
          item.size === size && 
          item.packSize === packSize
      );
      
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart,
  setCartOpen
} = cartSlice.actions;
export default cartSlice.reducer;