import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAppDispatch } from "../../store/hooks";
import { setCartOpen } from "../../store/cartSlice";
import { AuthDialog } from "../AuthDialog";

interface CartIconProps {
  color?: string;
}

const CartIcon = ({ color = "primary" }: CartIconProps) => {
  const { isAuthenticated, getTotalItems } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const totalItems = getTotalItems();

  const handleCartClick = () => {
    if (!isAuthenticated) {
      // Show login dialog
      setShowAuthDialog(true);
    } else {
      // Open cart drawer/page
      dispatch(setCartOpen(true));
      navigate("/cart");
    }
  };

  return (
    <>
      <Tooltip title={isAuthenticated ? "View Cart" : "Login to view cart"}>
        <IconButton
          onClick={handleCartClick}
          size="large"
          aria-label={`Show ${totalItems} items in cart`}
          color={color as any}
          sx={{
            position: "relative",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Badge badgeContent={totalItems} color="error" overlap="circular">
            <ShoppingCart htmlColor="white" />
          </Badge>
        </IconButton>
      </Tooltip>

      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        title="Login to View Cart"
        message="Please sign in to view your cart"
      />
    </>
  );
};

export default CartIcon;
