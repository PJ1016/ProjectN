import { Box, Grid } from "@mui/material";
import React from "react";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImage";
export const ProductFeatures = [
  "Crafted with super soft and comfy GOTS certified 100% organic cotton",
  "Bio-superabsorbent for superior absorbency with protection from rash & irritation",
  "Fresh & free-spirited with breathable plant-based backlayer",
  "Ultra-thin & multi-layered pad with leak locker technology",
  "Sidewall with leak-guard technology for extra protection",
  "India’s 1st & only certified ~100% compostable pads — composts in 3–6 months",
  "Free of harsh chemicals, fragrances & plastics",
  "Verified product: ISO-17088 certified, follows BIS (Govt. of India), US-FDA norms",
];

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
