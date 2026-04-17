import { productModel } from "../models/ProductModel.ts";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInProducts = async () => {
  const products = [
    { title: "lap top", image: "image1.jpg", price: 200, stock: 290 },
  ];

  const existingProduct = await getAllProducts();
  if (existingProduct.length === 0) {
    await productModel.insertMany(products);
  }
};
