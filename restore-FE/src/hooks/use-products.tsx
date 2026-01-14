import { useQuery } from "@tanstack/react-query";
import type { Product } from "../app/types/product";
import { fetchAllProducts } from "../api/products/get-all-products";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["/products"],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
