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
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
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
}

const ProductDetails = ({ productDetails }: IProductDetails) => {
  const {
    productName,
    productMRP,
    productShipping,
    productFeatures,
    productPrice,
  } = productDetails;
  const [formData, setFormData] = useState({
    size: "XXL",
    itemType: "10 PADS",
    quantity: 0,
  });
  const handleFormData = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);

  return (
    <Stack gap="12px">
      <Typography fontWeight="bold" variant="h4" gutterBottom>
        {productName}
      </Typography>
      <PriceDisplay discountedPrice={productPrice} mrp={productMRP} />
      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: "#FFF0F3" }}>
        <Grid container gap={2}>
          <Grid item>
            <OptionGroup
              label="Select Pad Size"
              name="size"
              value={formData.size}
              options={["XXL", "XXXL", "Combo"]}
              onChange={(_, val) => handleFormData(val, "size")}
            />
          </Grid>
          <Grid item>
            <OptionGroup
              label="Select Pack Size"
              name="itemType"
              value={formData.itemType}
              options={["10 PADS", "20 PADS", "30 PADS"]}
              onChange={(_, val) => handleFormData(val, "itemType")}
            />
          </Grid>
        </Grid>
      </Paper>

      <QuantitySelector
        value={0}
        setValue={() => {
          console.log("Hello");
        }}
      />
      <Stack gap="10px" direction="row">
        <Button variant="contained" startIcon={<ShoppingBagIcon />}>
          Add to cart
        </Button>
        <Button variant="contained" startIcon={<ShoppingCartCheckoutIcon />}>
          Buy it now
        </Button>
      </Stack>
      <Box sx={{ bgcolor: "#FFF6F9", p: 2, borderRadius: 2 }}>
        <List sx={{ listStyleType: "disc", pl: 4 }}>
          {productFeatures.map((feature, index) => (
            <ListItem
              key={`${index}-${feature}`}
              sx={{
                display: "list-item", // Make it use bullet
                alignItems: "flex-start", // Align text nicely at top
                paddingY: 0.5,
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Roboto, sans-serif"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ marginBottom: "12px", borderBottomWidth: "2px" }} />
      <Stack direction="row" alignItems="center" gap="1rem">
        <LocalShippingIcon sx={{ color: "	#EC407A" }} />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {productShipping}
        </Typography>
      </Stack>
      <Divider sx={{ marginTop: "12px", borderBottomWidth: "2px" }} />
    </Stack>
  );
};

export default ProductDetails;
