/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { cartItem } from "../../types/Cart";
import { useAuth } from "../auth/AuthContext";
import { BASC_URL } from "../../constants/BascURL";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setcartItems] = useState<cartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");
  const AddItemToCart = async (productId: string) => {
    try {
      const res = await fetch(`${BASC_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quntatity: 1,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();

        console.log("Server Error:", errorText);

        setError(errorText || "Failed to add to cart");

        return;
      }
      const cart = await res.json();
      if (!cart) {
        setError("no cart");
        return;
      }
      const cartItemMaped =cart.item.map(({
        product,
        quntatity,
      }: {
        product: any;
        quntatity: number;
      }) => ({
        productId: product._id,
        title: product.title,
        unitPrice: product.price,
        image: product.image,
        quntatity,
      }));

      setcartItems([...cartItemMaped]);
      setTotalAmount(cart.totalAmount);
      console.log("items is", cart);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, AddItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
