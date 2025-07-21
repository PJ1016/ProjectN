import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  packSize?: string;
}

export const useCart = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addItemToCart = (
    product: Product,
    quantity: number = 1,
    size?: string,
    packSize?: string
  ) => {
    if (!isAuthenticated) {
      // The authentication dialog will be shown by the component
      return false;
    }

    // Add to cart
    dispatch(
      addToCart({
        id: product.id || "",
        product,
        quantity,
        size,
        packSize,
      })
    );
    return true;
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return items.reduce((sum, item) => {
      const price =
        item.product.price * (1 - (item.product.discount || 0) / 100);
      return sum + price * item.quantity;
    }, 0);
  };

  return {
    items,
    isAuthenticated,
    addItemToCart,
    getTotalItems,
    getCartTotal,
  };
};
