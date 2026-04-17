import express from "express";
import { getAllProducts } from "../services/ProductServices.ts";

export const productRouter = express();

productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("Somethig went wrong!");
  }
});
