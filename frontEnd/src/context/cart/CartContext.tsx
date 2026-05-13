import { createContext, useContext } from "react";
import type { cartItem } from "../../types/Cart";

interface cartContextType {
  cartItems: cartItem[];
  totalAmount: number;
  AddItemToCart: (productId: string) => void;
  onClickHandler: (productId: string, quntatity: number) => void;
  removeItemFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<cartContextType>({
  cartItems: [],
  totalAmount: 0,
  AddItemToCart: () => {},
  onClickHandler: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
});
export const UseCart = () => useContext(CartContext);
