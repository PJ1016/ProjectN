import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Chip,
  Rating,
} from "@mui/material";
import {
  LocalShipping,
  ShoppingBag,
  ShoppingCartCheckout,
  Verified,
  Nature,
  Favorite,
  Star,
} from "@mui/icons-material";
import AddToCartButton from "../Cart/AddToCartButton";
import type { Product } from "../../services/firestoreService";
import OptionGroup from "../OptionGroup";
import { QuantitySelector } from "../QuantitySelector";
import { PriceDisplay } from "./PriceDisplay";

interface IProductDetails {
  productDetails: {
    productName: string;
    productPrice: number;
    productMRP: number;
    productFeatures: string[];
    productShipping: string;
  };
  product?: Product;
}

const ProductDetails = ({ productDetails, product }: IProductDetails) => {
  const {
    productName,
    productMRP,
    productShipping,
    productFeatures,
    productPrice,
  } = productDetails;
  const [formData, setFormData] = useState({
    size: "Regular",
    itemType: "10 PADS",
    quantity: 1,
  });

  const handleFormData = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Stack gap={{ xs: 2, md: 3 }} sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Product Title with Trust Badges */}
      <Box>
        <Typography
          variant={{ xs: "h5", md: "h4" }}
          sx={{
            color: "primary.main",
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "1.5rem", md: "2.125rem" },
          }}
        >
          {productName}
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={1}
          mb={2}
          flexWrap="wrap"
        >
          <Chip
            icon={<Verified />}
            label="Certified Organic"
            size="small"
            sx={{ bgcolor: "success.light", color: "white" }}
          />
          <Chip
            icon={<Nature />}
            label="Eco-Friendly"
            size="small"
            sx={{ bgcolor: "primary.light", color: "white" }}
          />
          <Chip
            icon={<Favorite />}
            label="Dermatologist Tested"
            size="small"
            sx={{ bgcolor: "secondary.light", color: "primary.main" }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Rating value={4.8} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            (2,847 reviews)
          </Typography>
        </Stack>
      </Box>

      {/* Enhanced Price Display */}
      <Box
        sx={{
          bgcolor: "linear-gradient(45deg, #ffeef4, #fff0f6)",
          p: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.light",
        }}
      >
        <PriceDisplay discountedPrice={productPrice} mrp={productMRP} />
        <Typography
          variant="body2"
          sx={{ color: "success.main", fontWeight: 600, mt: 1 }}
        >
          💰 Save ${(productMRP - productPrice).toFixed(2)} with this offer!
        </Typography>
      </Box>

      {/* Product Options */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: "background.paper",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "primary.light",
        }}
      >
        <Typography
          variant={{ xs: "subtitle1", sm: "h6" }}
          sx={{ color: "primary.main", mb: 2, fontWeight: 600 }}
        >
          Customize Your Order
        </Typography>
        <Stack spacing={2}>
          <OptionGroup
            label="Absorbency Level"
            name="size"
            value={formData.size}
            options={["Light", "Regular", "Heavy", "Overnight"]}
            onChange={(_, val) => handleFormData(val, "size")}
          />
          <OptionGroup
            label="Pack Size"
            name="itemType"
            value={formData.itemType}
            options={["10 PADS", "20 PADS", "30 PADS (Best Value)"]}
            onChange={(_, val) => handleFormData(val, "itemType")}
          />
        </Stack>
      </Paper>

      {/* Quantity Selector */}
      <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
          Quantity
        </Typography>
        <QuantitySelector
          value={formData.quantity}
          setValue={(val) => setFormData({ ...formData, quantity: val })}
        />
      </Box>

      {/* Action Buttons */}
      <Stack gap={{ xs: 1.5, sm: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCartCheckout />}
          sx={{
            background: "linear-gradient(45deg, #e91e63, #f06292)",
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 600,
            borderRadius: 3,
            "&:hover": {
              background: "linear-gradient(45deg, #c2185b, #e91e63)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Buy Now - Fast Delivery
        </Button>
        {product ? (
          <AddToCartButton 
            product={product}
            quantity={formData.quantity}
            size={formData.size}
            packSize={formData.itemType}
          />
        ) : (
          <Button
            variant="outlined"
            size="large"
            startIcon={<ShoppingBag />}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: 3,
              "&:hover": {
                bgcolor: "primary.light",
                borderColor: "primary.main",
              },
            }}
          >
            Add to Cart
          </Button>
        )}
      </Stack>

      {/* Product Features */}
      <Box
        sx={{
          bgcolor: "linear-gradient(45deg, #ffeef4, #fff0f6)",
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "primary.main", mb: 2, fontWeight: 600 }}
        >
          🌿 Why Women Love Our Organic Pads
        </Typography>
        <List sx={{ p: 0 }}>
          {productFeatures.map((feature, index) => (
            <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  "&:before": {
                    content: '"✓ "',
                    color: "success.main",
                    fontWeight: "bold",
                  },
                }}
              >
                {feature}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Shipping Info */}
      <Box
        sx={{
          bgcolor: "success.light",
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "success.main",
        }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <LocalShipping sx={{ color: "success.main" }} />
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "success.dark" }}
            >
              {productShipping}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discreet packaging • Delivered in 2-3 days
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Trust Indicators */}
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          🔒 Secure Payment • 💯 30-Day Money Back • 🌱 Eco-Certified
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Join 50,000+ women who trust PureFlow for their natural cycle
        </Typography>
      </Box>
    </Stack>
  );
};

export default ProductDetails;
