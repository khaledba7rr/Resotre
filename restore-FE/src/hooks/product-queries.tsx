import { useQuery } from "@tanstack/react-query";
import type { Product } from "../app/types/product";
import { fetchAllProducts } from "../api/products/get-all-products";
import { fetchSingleProduct } from "../api/products/get-single-product";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["/products"],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useSingleProducts = (id: number) => {
  return useQuery<Product>({
    queryKey: ["/products/get-product", id],
    queryFn: () => fetchSingleProduct(id),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
