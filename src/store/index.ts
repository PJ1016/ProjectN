import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './adminSlice';
import { productsApi } from './api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;