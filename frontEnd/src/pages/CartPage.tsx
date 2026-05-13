import { UseCart } from "../context/cart/CartContext";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";




const CartPage = () => {
  const { cartItems, totalAmount ,onClickHandler, removeItemFromCart, clearCart} = UseCart();

const handlerQuantity = (productId: string , quntatity : number ) => {
if(quntatity <= 0){
  return;
}
  onClickHandler(productId , quntatity);
}
const handelRemoveFromCart = (productId: string) => {
  removeItemFromCart(productId);
}

 const handelClearCart = () => {
  clearCart();
 }
const handlerCart= () => {
  return(<>
  <div className=" flex flex-col md:flex-row gap-6 justify-between items-center">
         <h1 className="text-3xl mb-5">Cart Page</h1>
          <Button variant="contained" color="error" size="large" onClick={()=>handelClearCart()}>Clear Cart</Button>
         </div> <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col w-full md:w-3/4 gap-6 justify-between">
            {cartItems.map((item) => (
              <>
                <div
                  key={item.productId}
                  className="flex   gap-2 rounded shadow px-3 py-2 items-center "
                >
                  <img src={item.image} alt="" className="w-[120px]" />
                  <div className="flex flex-col md:flex-row gap-6 justify-between  w-full px-10">
                    <div className="flex flex-col gap-2  ">
                      <h1 className="text-3xl ">{item.title}</h1>
                      <p>
                        {item.quntatity} * {item.unitPrice}{" "}
                        <span className="ps-1 text-[14px] text-gray-500 font-semibold">
                          EGP
                        </span>
                      </p>
                    </div>
                    <div className=" flex justify-between items-center gap-3">
                      <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled button group"
                      >
                        <Button onClick={()=>handlerQuantity(item.productId , item.quntatity + 1)}>+</Button>
                        <Button onClick={()=>handlerQuantity(item.productId , item.quntatity - 1)}>-</Button>
                      </ButtonGroup>
                      <IconButton aria-label="delete" size="large" sx={{ color: "red" }}>
                        <DeleteIcon fontSize="inherit" onClick={()=> handelRemoveFromCart(item.productId)} />
                      </IconButton>
                    </div>
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
    <>
      <section className="mt-10 px-20">
       
       {cartItems.length > 0 ? handlerCart() : <h1 className="text-3xl font-semibold text-center mt-10 text-red-600">Your Cart Is Empty</h1>}
       
      </section>
    </>
  );
};

export default CartPage;
