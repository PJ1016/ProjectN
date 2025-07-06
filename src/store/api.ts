import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firestoreService, type Product } from "../services/firestoreService";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: () => firestoreService.getProducts().then((data) => ({ data })),
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<
      string,
      Omit<Product, "id" | "createdAt" | "updatedAt">
    >({
      queryFn: (product) =>
        firestoreService.addProduct(product).then((data) => ({ data })),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      void,
      { id: string; product: Partial<Product> }
    >({
      queryFn: ({ id, product }) =>
        firestoreService
          .updateProduct(id, product)
          .then(() => ({ data: undefined })),
      invalidatesTags: ["Product"],
    }),
    updateStock: builder.mutation<void, { id: string; stock: number }>({
      queryFn: ({ id, stock }) =>
        firestoreService
          .updateStock(id, stock)
          .then(() => ({ data: undefined })),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateStockMutation,
} = productsApi;
