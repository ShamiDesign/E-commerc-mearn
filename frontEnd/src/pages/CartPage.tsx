import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { BASC_URL } from "../constants/BascURL";

const CartPage = () => {
  const [cart, setCart] = useState();
  const [error, setError] = useState("");
  const { token } = useAuth();

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
      const data = await res.json();
      setCart(data);
    };

    fetchCart();
  }, [token]);
  console.log({ cart });

  return (
    <>
      <section className="mt-14 px-20">
        <h1 className="text-3xl">Cart Page</h1>
      </section>
    </>
  );
};

export default CartPage;
