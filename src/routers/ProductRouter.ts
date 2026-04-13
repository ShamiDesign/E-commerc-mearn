import express from "express";
import { getAllProducts } from "../services/ProductServices.ts";

export  const productRouter = express();

productRouter.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.status(200).send(products);
});

