import { Container } from "@mui/material";
import ProductCard from "../product-card/ProductCard";
import Error from "../error/Error";
import { useGetProductsQuery } from "../../../api/products/products";

import { Typography } from "@mui/material";
import { getErrorMessage } from "../../../api/helpers/helpers";
import type { JSX } from "react";
import { useAppSelector } from "../../store/store";

export default function ProductList() {
  const { data: products = [], isError, error } = useGetProductsQuery();
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  if (isError) {
    return <Error message={getErrorMessage(error)} />;
  }

  const showProductList = (): JSX.Element => {
    if (isLoading) {
      return <Typography>Loading products...</Typography>;
    }

    if (!isLoading && products.length === 0) {
      return <Typography>No products found.</Typography>;
    }
    return (
      <Container
        sx={{
          display: { lg: "flex", xs: "block", sm: "flex" },
          justifyContent: "center",
          margin: "50px auto",
          flexWrap: "wrap",
          minWidth: { lg: "100%" },
          gap: 3,
        }}
      >
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        {!products && <Typography>No products found.</Typography>}
      </Container>
    );
  };

  return <>{showProductList()}</>;
}
