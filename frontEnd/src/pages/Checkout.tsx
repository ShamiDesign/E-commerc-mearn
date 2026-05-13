import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import { UseCart } from "../context/cart/CartContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BASC_URL } from "../constants/BascURL";



 const Checkout = () => {

const {token}=useAuth();
const navigate = useNavigate();
  const { cartItems, totalAmount } = UseCart();
 const addresRef = useRef<HTMLInputElement>(null);
 
const handleConfermOrder = async () => {
  const addres = addresRef.current?.value;
  if (!addres) return;
const res = await fetch(`${BASC_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
       addres,
      }),
    });
    if(!res.ok) return
   navigate("/SuccessOrder")

}

const handlerCart= () => {
  return(<>
 <div className="flex flex-col md:flex-row justify-between gap-6 mt-10 ">
          <div className="flex flex-col w-full md:w-1/2 gap-2 rounded-xl justify-between shadow  p-4">
            {cartItems.map((item) => (
              <>
                <div
                  key={item.productId}
                  className="flex   gap-6  px-5 py-2  items-center border-b-2 border-gray-50 "
                >
                  <img src={item.image} alt="" className="w-[80px]" />
                    <div className="flex  gap-4 item-center  w-full justify-between ">
                      <h1 className="text-3xl ">{item.title}</h1>
                      <p className="flex items-center gap-2">
                        {item.quntatity} * {item.unitPrice}{" "}
                        <span className="ps-1 text-[14px] text-gray-500 font-semibold">
                          EGP
                        </span>
                      </p>
                    </div>
                  <div className="flex flex-col md:flex-row gap-6 justify-between  w-full px-10">
                   
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className=" flex flex-col  w-full md:w-1/3 gap-2 rounded shadow  items-center ">
            <h1 className="w-full py-2 text-center font-semibold bg-teal-800/55">
              Total
            </h1>

            <h3 className="flex justify-between w-full px-6 border-b-[1px] border-gray-200 pb-4">
              <span> Count Item :</span> <span>{cartItems.length}</span>
            </h3>
            <h3 className="flex justify-between w-full px-6  pb-4 text-red-600 font-bold">
              <span> Total Price :</span> <span>{totalAmount}</span>
            </h3>
             
          </div>
        </div></>)
}

  return (
    <section className="mt-10 px-20">

    <div className="flex flex-col items-center  ">
        <h1 className="text-4xl text-red-600 font-semibold">Checkout</h1>
    </div>
    <div className="flex gap-8 w-full p-10 shadow border border-gray-100 rounded items-center justify-center mt-10">
        <h1 className="text-2xl font-semibold">Shipping addres</h1>
      <TextField inputRef={addresRef} id="outlined-basic" label="Add Your addres" variant="outlined" className="w-[400px]"/>
       <Button variant="contained" color="success" size="large" fullWidth 
               onClick={handleConfermOrder}>Pay Now</Button>
    </div>
    {cartItems.length > 0 ? handlerCart() : <h1 className="text-3xl font-semibold text-center mt-10 text-red-600">Your Cart Is Empty</h1>}
    </section>
  )
}
export default Checkout;