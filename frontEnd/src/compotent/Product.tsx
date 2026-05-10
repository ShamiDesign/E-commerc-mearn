import { UseCart } from "../context/cart/CartContext";

interface props {
  _id: string;
  title: string;
  image: string;
  price: string;
}

export default function Product({ _id, title, image, price }: props) {

const {AddItemToCart}=UseCart()

  return (
  

    <>
      <div className=" flex flex-col p-1 rounded-xl shadow gap-3 pb-4">
        <img src={image} className="w-[280px] h-[220px]" />
        <div className="ps-4">
          <h2 className="text-xl font-semibold ">{title}</h2>
          <h4 className="text-md  text-gray-500 flex gap-2">
            {price} <span className="text-teal-600 font-semibold">EGP</span>
          </h4>
        </div>
        <button onClick={()=>AddItemToCart(_id)} className="py-2 bg-teal-700 rounded-lg mx-2 text-white font-semibold text-xl cursor-pointer hover:bg-teal-600 transition duration-300">
          Add to Cart
        </button>
      </div>
    </>
  );
}
