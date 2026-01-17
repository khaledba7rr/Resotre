import {
  Box,
  Divider,
  FormControl,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";

import "./prduct-details.css";
import { useGetProductByIdQuery } from "../../../api/products/products-queries";
import NumberSpinner from "../number-spinner/NumberSpinner";

export default function ProductDetails() {
  const { id } = useParams() ?? 0;

  if (!id || isNaN(Number(id))) {
    return <Typography>Invalid product ID.</Typography>;
  }
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id));

  if (isLoading || !product) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error !</div>;
  }

  return (
    <Box>
      <Grid
        container
        spacing={6}
        maxWidth={"lg"}
        sx={{
          margin: {
            xs: "20px 40px",
            lg: "40px auto",
          },
        }}
      >
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <img
            className="product-image"
            src={product?.pictureUrl}
            alt={product?.name}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product?.name}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" component="h3" gutterBottom>
            ${product?.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product?.description}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h5" component="h2" gutterBottom>
            Specifications
          </Typography>
          <Typography variant="body1">
            - Brand : {product?.brand}
            <br />- Type : {product?.type}
            <br />
          </Typography>

          <Divider sx={{ mt: 2 }} />

          <Box mt={2}>
            <FormControl fullWidth component="form">
              <NumberSpinner
                min={1}
                max={5}
                name="quantity-added"
                id="quantity-added"
                size="small"
                error={product!.quantityInStock === 0}
                label="Quantity"
                defaultValue={1}
              />
              <Button sx={{ mt: 5 }} type="submit" variant="contained">
                Add To Cart
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
