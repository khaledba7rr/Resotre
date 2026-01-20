import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/types/product";
import type { ApiResponse } from "../../app/types/api-response";
import { baseQueryWithErrorHandling } from "../helpers/custom-query";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: "/products" }),
      transformResponse: (response: ApiResponse<Product[]>) => {
        return response.result;
      },
    }),

    getProductById: builder.query<Product, number>({
      query: (id: number) => ({ url: `/products/get-product/${id}` }),
      transformResponse: (response: ApiResponse<Product>) => {
        return response.result;
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
