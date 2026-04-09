import express from "express";
import { getAllProducts } from "../services/ProductServices.ts";

export  const productRouter = express();

productRouter.get("/", async (req, res) => {
  const product = await getAllProducts();
  res.status(200).send(product);
});

