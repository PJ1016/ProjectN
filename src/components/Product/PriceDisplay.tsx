import { Stack, Typography } from "@mui/material";

interface PriceDisplayProps {
  discountedPrice: number;
  mrp: number;
}

export const PriceDisplay = ({ discountedPrice, mrp }: PriceDisplayProps) => {
  const discountPercent = Math.round(((mrp - discountedPrice) / mrp) * 100);

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="baseline">
        {/* Discounted Price */}
        <Typography variant="h6" color="primary" fontWeight={700}>
          ₹{discountedPrice}
        </Typography>

        {/* MRP */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: "line-through" }}
        >
          ₹{mrp}
        </Typography>

        {/* Optional: Discount Percentage */}
        <Typography variant="body2" color="secondary" fontWeight="bold">
          ( {discountPercent}% OFF)
        </Typography>
      </Stack>
      <Typography variant="caption" fontWeight="bold" color="success">
        Inclusive of all taxes
      </Typography>
    </>
  );
};
