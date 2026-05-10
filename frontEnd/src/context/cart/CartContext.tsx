import { createContext, useContext } from "react";
import type { cartItem } from "../../types/Cart";

interface cartContextType {
  cartItems: cartItem[];
  totalAmount: number;
  AddItemToCart: (productId: string) => void;
}

export const CartContext = createContext<cartContextType>({
  cartItems: [],
  totalAmount: 0,
  AddItemToCart: () => {},
});
export const UseCart = () => useContext(CartContext);
