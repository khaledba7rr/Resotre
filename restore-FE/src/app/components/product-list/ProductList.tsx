import { Box, Container } from "@mui/material";
import ProductCard from "../product-card/ProductCard";
import { useProducts } from "../../../hooks/use-products";
import Spinner from "../spinner/Spinner";

export default function ProductList() {
  const { data: products = [], isLoading, error } = useProducts();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error loading products</div>;
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
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
}
