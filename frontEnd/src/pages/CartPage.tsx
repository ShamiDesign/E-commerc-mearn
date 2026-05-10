import { UseCart } from "../context/cart/CartContext";

const CartPage = () => {
  const { cartItems, totalAmount } = UseCart();
  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   const fetchCart = async () => {
  //     const res = await fetch(`${BASC_URL}/cart`, {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!res.ok) {
  //       setError("Can't Fetch Cart");
  //     }
  //     const data = await res.json();
  //     setCart(data);
  //   };

  //   fetchCart();
  // }, [token]);
  // console.log({ cart });

  return (
    <>
      <section className="mt-10 px-20">
        <h1 className="text-3xl mb-5">Cart Page</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col  w-3/4 gap-6 justify-between">
            {cartItems.map((item) => (
              <>
                <div
                  key={item.productId}
                  className="flex   gap-2 rounded shadow px-3 py-2 items-center "
                >
                  <img src={item.image} alt="" className="w-[120px]" />
                  <div className="flex flex-col gap-2  ">
                    <h1>{item.title}</h1>

                    <p>
                      {item.quntatity} * {item.unitPrice}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className=" flex flex-col w-1/3 gap-2 rounded shadow  items-center ">
            <h1 className="w-full py-2 text-center font-semibold bg-teal-800/55">
              Total
            </h1>

            <h3 className="flex justify-between w-full px-6 border-b-[1px] border-gray-200 pb-4">
              <span> Count Item :</span> <span>{cartItems.length}</span>
            </h3>
            <h3 className="flex justify-between w-full px-6  pb-4 text-red-600 font-bold"><span> Total Price :</span> <span>{totalAmount}</span></h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
