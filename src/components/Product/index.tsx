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
  Divider,
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
          <Grid xs={6} md={6}>
            <Box
              sx={{
                p: { xs: 1, sm: 2 },
                bgcolor: "linear-gradient(45deg, #ffeef4, #fff0f6)",
                borderRadius: 3,
                minHeight: { xs: 300, md: 500 },
              }}
            >
              <ProductImageGallery productImage={selectedProduct.imageUrl} />
            </Box>
          </Grid>
          <Grid xs={6} md={6}>
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
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          px: { xs: 2, sm: 4, md: 0 },
          py: { xs: 4, md: 6 },
          background:
            "linear-gradient(135deg, #ffeef4 0%, #fff0f6 50%, #f3e5f5 100%)",
          borderRadius: 4,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #e91e63, #f06292, #ba68c8)",
          },
        }}
      >
        <Typography
          variant={{ xs: "h4", md: "h3" }}
          sx={{
            fontWeight: 800,
            mb: { xs: 2, md: 3 },
            background: "linear-gradient(45deg, #e91e63, #f06292)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          🌿 Pure Organic Collection
        </Typography>
        <Divider sx={{ margin: "1rem" }} />
        <Typography
          sx={{
            mb: { xs: 3, md: 4 },
            maxWidth: 700,
            mx: "auto",
            color: "text.secondary",
            lineHeight: 1.6,
            fontSize: { xs: "1rem", md: "1.2rem" },
          }}
        >
          Discover our premium range of organic sanitary pads, crafted with love
          for your natural cycle
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2 }}
          justifyContent="center"
          alignItems="center"
          sx={{ flexWrap: "wrap", gap: { xs: 1, sm: 2 } }}
        >
          <Chip
            icon={<Verified sx={{ fontSize: 18 }} />}
            label="Certified Organic"
            sx={{
              bgcolor: "success.secondary",
              color: "",
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          />
          <Chip
            icon={<Nature sx={{ fontSize: 18 }} />}
            label="100% Natural"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          />
          <Chip
            icon={<LocalShipping sx={{ fontSize: 18 }} />}
            label="Free Shipping"
            sx={{
              bgcolor: "secondary.main",
              color: "white",
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          />
        </Stack>
      </Box>

      <Grid container spacing={3} sx={{ mb: { xs: 6, md: 8 } }}>
        {products.map((product) => (
          <Grid xs={12} sm={6} md={3} key={product.id} sx={{ width: { xs: '100%', sm: '280px' } }}>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: 280,
                maxWidth: "100%",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                bgcolor: "background.paper",
                borderRadius: 1,
                "&:hover": {
                  boxShadow: 3,
                },
                transition: "box-shadow 0.3s ease",
              }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Discount Badge */}
              {product.discount > 0 && (
                <Chip
                  label={`${product.discount}% OFF`}
                  color="error"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 1,
                    fontWeight: 500,
                  }}
                />
              )}

              {/* Product Image */}
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  height: 280,
                  width: "100%",
                }}
              >
                {product.imageUrl ? (
                  <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.04)" },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      {product.name}
                    </Typography>
                  </Box>
                )}
              </Box>

              <CardContent
                sx={{
                  p: 2,
                  pt: 1.5,
                  pb: "12px !important",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Brand Name */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  ORGANIC CARE
                </Typography>

                {/* Product Name */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.name}
                </Typography>

                {/* Price and Discount */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 500, fontSize: "14px", color: "#282c3f" }}
                  >
                    ₹
                    {product.discount > 0
                      ? Math.round(product.price * (1 - product.discount / 100))
                      : product.price}
                  </Typography>

                  {product.discount > 0 && (
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "#7e818c",
                          fontSize: "12px",
                        }}
                      >
                        ₹{product.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#ff3f6c",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        ({product.discount}% OFF)
                      </Typography>
                    </>
                  )}
                </Box>

                {/* Rating */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                    bgcolor: "#f9f9f9",
                    width: "fit-content",
                    px: 0.5,
                    borderRadius: 0.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#282c3f",
                      fontWeight: 500,
                      fontSize: "12px",
                    }}
                  >
                    4.5{" "}
                    <Star sx={{ fontSize: 10, ml: 0.3, color: "#14958f" }} />
                  </Typography>
                </Box>

                {/* Price Section */}
                <Box sx={{ mb: 2 }}>
                  {product.discount > 0 ? (
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography
                        variant="h5"
                        sx={{ color: "primary.main", fontWeight: 700 }}
                      >
                        ₹
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
                        ₹{product.price}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "error.main", fontWeight: 600 }}
                      >
                        SAVE ₹
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
                <Chip
                  label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                  color={product.stock > 0 ? "success" : "error"}
                  size="small"
                  variant="outlined"
                  sx={{ my: 2 }}
                />

                {/* Action Button */}
                <Button
                  variant="contained"
                  color={product.stock > 0 ? "primary" : "inherit"}
                  fullWidth
                  disabled={product.stock === 0}
                  sx={{
                    py: 1,
                    fontWeight: 600,
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
