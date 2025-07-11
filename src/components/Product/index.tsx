import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Chip,
  Rating,
  Stack,
  Badge,
} from "@mui/material";
import { useState } from "react";
import {
  Verified,
  Nature,
  Favorite,
  LocalShipping,
  Star,
} from "@mui/icons-material";
import { useGetProductsQuery } from "../../store/api";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImage";
import type { Product } from "../../services/firestoreService";

const Product = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (selectedProduct) {
    const productDetails = {
      productName: selectedProduct.name,
      productPrice:
        selectedProduct.discount > 0
          ? selectedProduct.price * (1 - selectedProduct.discount / 100)
          : selectedProduct.price,
      productMRP: selectedProduct.price,
      productFeatures: [selectedProduct.description],
      productShipping: "Free Shipping",
    };

    return (
      <Container sx={{ py: 4 }}>
        <Button
          onClick={() => setSelectedProduct(null)}
          sx={{
            mb: 3,
            color: "primary.main",
            fontWeight: 600,
            "&:hover": { bgcolor: "primary.light" },
          }}
        >
          ← Back to Products
        </Button>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 1, sm: 2 },
                bgcolor: "linear-gradient(45deg, #ffeef4, #fff0f6)",
                borderRadius: 3,
                minHeight: { xs: 300, md: 500 }
              }}
            >
              <ProductImageGallery productImage={selectedProduct.imageUrl} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 1, sm: 2 },
                bgcolor: "white",
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <ProductDetails productDetails={productDetails} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress size={60} sx={{ color: "primary.main" }} />
        <Typography variant="h6" sx={{ mt: 2, color: "primary.main" }}>
          Loading our organic collection...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, px: { xs: 1, sm: 0 } }}>
        <Typography
          variant={{ xs: "h4", md: "h3" }}
          sx={{
            color: "primary.main",
            fontWeight: 700,
            mb: 2,
            background: "linear-gradient(45deg, #e91e63, #f06292)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🌿 Pure Organic Collection
        </Typography>
        <Typography
          variant={{ xs: "body1", md: "h6" }}
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 600, mx: "auto", px: { xs: 2, sm: 0 } }}
        >
          Discover our premium range of organic sanitary pads, crafted with love
          for your natural cycle
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ gap: 1 }}
        >
          <Chip
            icon={<Verified />}
            label="Certified Organic"
            sx={{ bgcolor: "success.light", color: "white" }}
          />
          <Chip
            icon={<Nature />}
            label="100% Natural"
            sx={{ bgcolor: "primary.light", color: "white" }}
          />
          <Chip
            icon={<LocalShipping />}
            label="Free Shipping"
            sx={{ bgcolor: "secondary.light", color: "primary.main" }}
          />
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                background: "linear-gradient(145deg, #ffffff 0%, #fef7f7 100%)",
                border: "1px solid",
                borderColor: "primary.light",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(255, 107, 157, 0.2)",
                  borderColor: "primary.main",
                },
                transition: "all 0.4s ease",
              }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Discount Badge */}
              {product.discount > 0 && (
                <Badge
                  badgeContent={`${product.discount}% OFF`}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 1,
                    "& .MuiBadge-badge": {
                      bgcolor: "error.main",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      padding: "4px 8px",
                      borderRadius: 2,
                    },
                  }}
                />
              )}

              {/* Product Image */}
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                {product.imageUrl ? (
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{
                      transition: "transform 0.4s ease",
                      "&:hover": { transform: "scale(1.05)" },
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 240,
                      bgcolor: "linear-gradient(45deg, #ffeef4, #fff0f6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" color="primary.main">
                      🌸 {product.name}
                    </Typography>
                  </Box>
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                {/* Product Title */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    mb: 1,
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                  <Rating value={4.5} precision={0.5} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    (4.5) • 1.2k reviews
                  </Typography>
                </Stack>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.description}
                </Typography>

                {/* Category */}
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    mb: 2,
                    bgcolor: "success.light",
                    color: "success.dark",
                    fontWeight: 500,
                  }}
                />

                {/* Price Section */}
                <Box sx={{ mb: 2 }}>
                  {product.discount > 0 ? (
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography
                        variant="h5"
                        sx={{ color: "primary.main", fontWeight: 700 }}
                      >
                        $
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                        }}
                      >
                        ${product.price}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "error.main", fontWeight: 600 }}
                      >
                        SAVE $
                        {(product.price * (product.discount / 100)).toFixed(2)}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography
                      variant="h5"
                      sx={{ color: "primary.main", fontWeight: 700 }}
                    >
                      ${product.price}
                    </Typography>
                  )}
                </Box>

                {/* Stock Status */}
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor:
                          product.stock > 0 ? "success.main" : "error.main",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          product.stock > 0 ? "success.main" : "error.main",
                        fontWeight: 600,
                      }}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </Stack>
                </Box>

                {/* Action Button */}
                <Button
                  variant="contained"
                  fullWidth
                  disabled={product.stock === 0}
                  sx={{
                    background:
                      product.stock > 0
                        ? "linear-gradient(45deg, #4caf50, #66bb6a)"
                        : "grey.300",
                    color: 'white',
                    py: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover":
                      product.stock > 0
                        ? {
                            background:
                              "linear-gradient(45deg, #388e3c, #4caf50)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                          }
                        : {},
                    "&:disabled": {
                      color: "text.secondary",
                    },
                  }}
                >
                  {product.stock > 0 ? "Shop Now" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {products.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h4" sx={{ color: "primary.main", mb: 2 }}>
            🌸 Coming Soon
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Our organic collection is being prepared with love
          </Typography>
        </Box>
      )}

      {/* Trust Section */}
      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          textAlign: "center",
          py: { xs: 3, md: 4 },
          px: { xs: 2, sm: 0 },
          bgcolor: "linear-gradient(45deg, #ffeef4, #fff0f6)",
          borderRadius: 3,
        }}
      >
        <Typography
          variant={{ xs: "h6", md: "h5" }}
          sx={{ color: "primary.main", mb: 2, fontWeight: 600 }}
        >
          Why 50,000+ Women Trust PureFlow
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, md: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ color: "success.main", fontWeight: 700 }}
            >
              🌱 100% Organic
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Certified organic cotton
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              🚚 Free Shipping
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discreet packaging
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ color: "error.main", fontWeight: 700 }}
            >
              💯 Money Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              30-day guarantee
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Product;
