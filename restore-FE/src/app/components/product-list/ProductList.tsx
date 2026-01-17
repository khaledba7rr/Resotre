import { Container } from "@mui/material";
import ProductCard from "../product-card/ProductCard";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { useGetProductsQuery } from "../../../api/products/products";

import { Typography } from "@mui/material";
import { getErrorMessage } from "../../../api/helpers/helpers";

export default function ProductList() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error message={getErrorMessage(error)} />;
  }

  if (!products.length) {
    return <Typography>No products available.</Typography>;
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
}
