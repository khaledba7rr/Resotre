import { Container } from "@mui/material";
import ProductCard from "../product-card/ProductCard";
import Spinner from "../spinner/Spinner";
import { useGetProductsQuery } from "../../../api/products/products-queries";

import { Typography } from "@mui/material";

export default function ProductList() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  if (isLoading || !products) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error !</div>;
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
