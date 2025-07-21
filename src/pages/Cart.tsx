import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { useCart } from "../hooks/useCart";
import { AuthDialog } from "../components/AuthDialog";

const Cart = () => {
  const { items, isAuthenticated, getCartTotal } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
            Please login to view your cart
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAuthDialog(true)}
            sx={{ px: 4, py: 1.5 }}
          >
            Login with Google
          </Button>
        </Container>
        
        <AuthDialog 
          open={showAuthDialog}
          onClose={() => setShowAuthDialog(false)}
          title="Login to View Cart"
          message="Please sign in to view your cart items"
        />
      </>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ px: 4, py: 1.5 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  function calculateItemPrice(item: any) {
    const basePrice = item.product.price;
    const discount = item.product.discount || 0;
    return basePrice * (1 - discount / 100);
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600, color: "primary.main" }}
      >
        Your Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {items.map((item) => (
              <Box key={`${item.id}-${item.size}-${item.packSize}`}>
                <Grid container spacing={2} alignItems="center">
                  {/* Product Image */}
                  <Grid item xs={3} sm={2}>
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio: "1/1",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Grid>

                  {/* Product Details */}
                  <Grid item xs={9} sm={10}>
                    <Box sx={{ pl: { xs: 1, sm: 2 } }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {item.product.name}
                      </Typography>

                      {/* Options */}
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 0.5, sm: 2 }}
                        sx={{ mb: 1 }}
                      >
                        {item.size && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Size: {item.size}
                          </Typography>
                        )}
                        {item.packSize && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Pack: {item.packSize}
                          </Typography>
                        )}
                      </Stack>

                      {/* Price and Quantity */}
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, color: "primary.main" }}
                          >
                            ₹{calculateItemPrice(item).toFixed(2)}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            {/* Quantity Controls */}
                            <IconButton
                              size="small"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: Math.max(1, item.quantity - 1),
                                    size: item.size,
                                    packSize: item.packSize,
                                  })
                                )
                              }
                              sx={{ bgcolor: "grey.100" }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>

                            <Typography sx={{ minWidth: 30, textAlign: "center" }}>
                              {item.quantity}
                            </Typography>

                            <IconButton
                              size="small"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity + 1,
                                    size: item.size,
                                    packSize: item.packSize,
                                  })
                                )
                              }
                              sx={{ bgcolor: "grey.100" }}
                            >
                              <Add fontSize="small" />
                            </IconButton>

                            {/* Delete Button */}
                            <IconButton
                              color="error"
                              onClick={() => dispatch(removeFromCart(item.id))}
                              sx={{ ml: 1 }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}

            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              position: "sticky",
              top: 24,
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Order Summary
            </Typography>

            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight={500}>₹{subtotal.toFixed(2)}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="text.secondary">Shipping</Typography>
                <Typography fontWeight={500}>
                  {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                </Typography>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight={600}>Total</Typography>
                <Typography fontWeight={700} color="primary.main">
                  ₹{total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: 600,
                  background: "linear-gradient(45deg, #e91e63, #f06292)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #c2185b, #e91e63)",
                  },
                }}
              >
                Proceed to Checkout
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                sx={{ mt: 2, display: "block" }}
              >
                🔒 Secure Checkout • Free Returns • 30-Day Money Back
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;