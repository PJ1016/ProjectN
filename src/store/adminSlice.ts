import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../services/firestoreService";

interface AdminState {
  products: Product[];
  isAdmin: boolean;
  loading: boolean;
}

const initialState: AdminState = {
  products: [],
  isAdmin: false,
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminStatus: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAdminStatus, setProducts, setLoading } = adminSlice.actions;
export default adminSlice.reducer;
