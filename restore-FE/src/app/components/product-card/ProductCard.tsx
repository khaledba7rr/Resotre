import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { Product } from "../../types/product";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      sx={{
        margin: { xs: 3 },
        minWidth: { sm: "90%", md: "40%", lg: "350px" },
      }}
      elevation={3}
    >
      <CardMedia
        component="img"
        sx={{
          height: 240,
          backgroundSize: "cover",
        }}
        image={product.pictureUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography
          sx={{ textTransform: "uppercase" }}
          gutterBottom
          variant="subtitle2"
        >
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small">Add to Cart</Button>
        <Button component={NavLink} to={`/product/${product.id}`} size="small">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
