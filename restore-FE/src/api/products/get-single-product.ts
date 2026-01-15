import type { ApiResponse } from "../../app/types/api-response";
import type { Product } from "../../app/types/product";
import { api } from "../axios";

export const fetchSingleProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get<ApiResponse<Product>>(
    `/products/get-product/${id}`
  );

  if (data.isError) {
    throw new Error(data.errors.join(", ") || "Error fetching product");
  }

  return data.result;
};
