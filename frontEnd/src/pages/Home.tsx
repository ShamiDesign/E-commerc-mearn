import Product from "../compotent/Product";
import { useState, useEffect } from "react";
import type { IProduct } from "../types/Product";
import { BASC_URL } from "../constants/BascURL";

const HomePage = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fechProduct = async () => {
      try {
        const res = await fetch(`${BASC_URL}/product`);
        const data = await res.json();
        console.log(data);
        setProduct(data);
      } catch {
        setErr(true);
      }
    };
    fechProduct();
  }, []);
  if (err) {
    return (
      <h2 className="flex justify-center items-center font-bold text-red-600 text-6xl mt-20">
        Somethig wrong!{" "}
      </h2>
    );
  }

  return (
    <>
      <section className="flex  flex-col gap-4 px-14 pt-10">
        <h1 className="text-[40px] font-semibold mb-10">All Products</h1>
        <div className="flex flex-wrap justify-between gap-7">
          {product.map((p) => (
            <div key={p._id}>
              <Product {...p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default HomePage;
