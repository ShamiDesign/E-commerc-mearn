import { createContext, useContext } from "react";

interface createContextType {
  productId: string;
  title: string;
  unitPrice: number;
  quantaty: number;
}
export const CartContext = createContext<createContextType>({
  productId: null,
  title: null,
  unitPrice: null,
  quantaty: 1,
});
export const useCart = () => useContext(CartContext);
