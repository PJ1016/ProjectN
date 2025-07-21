import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const ProductImageGallery = ({ productImage }: { productImage?: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      alignItems={isMobile ? "center" : "flex-start"}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          aspectRatio: "1 / 1",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "#fff",
        }}
      >
        <img
          src={productImage}
          alt="Sanitary Pad Product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Box>
    </Stack>
  );
};

export default ProductImageGallery;
