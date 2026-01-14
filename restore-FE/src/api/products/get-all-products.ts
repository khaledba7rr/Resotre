import type { ApiResponse } from "../../app/types/api-response";
import type { Product } from "../../app/types/product";
import { api } from "../axios";

export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<ApiResponse<Product[]>>("/products");

  if (data.isError) {
    throw new Error(data.errors.join(", ") || "Error fetching products");
  }

  return data.result;
};
