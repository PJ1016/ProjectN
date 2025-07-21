import { ShoppingCart } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import type { Product } from "../../services/firestoreService";
import { useCart } from "../../hooks/useCart";
import { AuthDialog } from "../AuthDialog";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  size?: string;
  packSize?: string;
  variant?: "icon" | "button";
  position?: "absolute" | "relative";
  top?: number | string;
  right?: number | string;
}

const AddToCartButton = ({
  product,
  quantity = 1,
  size,
  packSize,
  variant = "button",
  position = "relative",
  top,
  right,
}: AddToCartButtonProps) => {
  const { isAuthenticated, addItemToCart } = useCart();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    
    addItemToCart(product, quantity, size, packSize);
  };

  if (variant === "icon") {
    return (
      <>
        <Tooltip title={isAuthenticated ? "Add to Cart" : "Login to add to cart"}>
          <IconButton
            onClick={handleAddToCart}
            color="primary"
            aria-label="Add to cart"
            sx={{
              position,
              top,
              right,
              bgcolor: "white",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "primary.light",
                color: "white",
              },
            }}
          >
            <ShoppingCart />
          </IconButton>
        </Tooltip>
        
        <AuthDialog 
          open={showAuthDialog}
          onClose={() => setShowAuthDialog(false)}
          title="Login to Add to Cart"
          message="Please sign in to add items to your cart"
        />
      </>
    );
  }

  return (
    <>
      <Button
        variant="outlined"
        size="large"
        startIcon={<ShoppingCart />}
        onClick={handleAddToCart}
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
            color: "white",
          },
        }}
      >
        {isAuthenticated ? "Add to Cart" : "Login to Add to Cart"}
      </Button>
      
      <AuthDialog 
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        title="Login to Add to Cart"
        message="Please sign in to add items to your cart"
      />
    </>
  );
};

export default AddToCartButton;