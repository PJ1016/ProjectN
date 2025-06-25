import { Box, Grid } from "@mui/material";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImage";
import { ProductFeatures } from "../../utils/constants";

const Product = () => {
  const productDetails = {
    productName: "Anandi Sanitary Pads",
    productPrice: 300,
    productMRP: 598.0,
    productFeatures: ProductFeatures,
    productShipping: "Free Shipping",
  };
  return (
    <Grid container spacing={2} gap="2rem">
      <Grid item xs={4} md={6}>
        <Box sx={{ p: 2, bgcolor: "#FFF0F3", height: "100%" }}>
          <ProductImageGallery />
        </Box>
      </Grid>

      <Grid item xs={6} md={6} mt={2}>
        <Box sx={{ p: 2, bgcolor: "#efefef", height: "100%" }}>
          <ProductDetails productDetails={productDetails} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Product;
