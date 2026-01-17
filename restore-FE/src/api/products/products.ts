import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUri } from "../constants";
import type { Product } from "../../app/types/product";
import type { ApiResponse } from "../../app/types/api-response";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: baseUri,
  }),
  tagTypes: ["Products", "Product"],
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
