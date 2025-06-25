import { Add, Remove } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

export const QuantitySelector = ({
  value,
  setValue,
  min = 1,
  max = 99,
}: {
  value: number;
  setValue: (val: number) => void;
  min?: number;
  max?: number;
}) => {
  const handleIncrement = () => {
    if (value < max) setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) setValue(value - 1);
  };

  return (
    <>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        fontWeight={600}
        gutterBottom
      >
        Quantity
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label="Decrease quantity"
        >
          <Remove />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={{ minWidth: 32, textAlign: "center" }}
          color="text.primary"
        >
          {value}
        </Typography>
        <IconButton
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label="Increase quantity"
        >
          <Add />
        </IconButton>
      </Stack>
    </>
  );
};
