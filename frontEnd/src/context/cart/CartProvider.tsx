/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { cartItem } from "../../types/Cart";
import { useAuth } from "../auth/AuthContext";
import { BASC_URL } from "../../constants/BascURL";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setcartItems] = useState<cartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");



useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      const res = await fetch(`${BASC_URL}/cart`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        setError("Can't Fetch Cart");
      }
      const cart = await res.json();
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

      setcartItems(cartItemMaped);
    };

    fetchCart();
  }, []);
 

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
      
      const cartItemMaped = cart.item.map(({
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

      setcartItems(cartItemMaped);
      setTotalAmount(cart.totalAmount);
      console.log("items is", cart);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const onClickHandler = async (productId: string, quntatity: number) => {
    try {
      const res = await fetch(`${BASC_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quntatity,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log("Server Error:", errorText);
        setError(errorText || "Failed to update cart item");
        return;
      }

      const cart = await res.json();
      const cartItemMaped = cart.item.map(({
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

      setcartItems(cartItemMaped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
 const removeItemFromCart = async (productId: string) => {
 try {
      const res = await fetch(`${BASC_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log("Server Error:", errorText);
        setError(errorText || "Failed to update cart item");
        return;
      }

      const cart = await res.json();
      const cartItemMaped = cart.item.map(({
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

      setcartItems(cartItemMaped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
}

const clearCart = async () => {
   try {
      const res = await fetch(`${BASC_URL}/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
     
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log("Server Error:", errorText);
        setError(errorText || "Failed to Clear cart item");
        return;
      }

     

      setcartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
}
  return (
    <CartContext.Provider value={{ cartItems, totalAmount, AddItemToCart ,onClickHandler, removeItemFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
