import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";

const productImages = [
  "https://i0.wp.com/papayain.com/wp-content/uploads/2022/01/1-1-scaled.jpg?fit=2560%2C1707&ssl=1",
  "https://images.pexels.com/photos/5938365/pexels-photo-5938365.jpeg",
  "https://images.pexels.com/photos/5938366/pexels-photo-5938366.jpeg",
];

const ProductImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      alignItems={isMobile ? "center" : "flex-start"}
    >
      {/* Thumbnails (left on desktop, top on mobile) */}
      <Stack
        direction={isMobile ? "row" : "column"}
        spacing={1}
        justifyContent="center"
        flexWrap="wrap"
      >
        {productImages.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            sx={{
              width: 60,
              height: 60,
              borderRadius: 1,
              objectFit: "cover",
              border:
                img === selectedImage ? "2px solid #C2185B" : "1px solid #ccc",
              cursor: "pointer",
              transition: "border 0.2s",
            }}
          />
        ))}
      </Stack>

      {/* Main Image */}
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
          src={selectedImage}
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
