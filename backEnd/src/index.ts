import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/UserRout.ts";
import { seedInProducts } from "./services/ProductServices.ts";
import { productRouter } from "./routers/ProductRouter.ts";
import CartRouter from "./routers/CartRouter.ts";
const app = express();
const port = 3001;
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.URL_KEY || "")
  .then(() => console.log("Connected Mongoose"))
  .catch((error) => console.log("Faild Connected to Mongoose", error));

seedInProducts();

app.use("/user", router);
app.use("/product", productRouter);
app.use("/cart", CartRouter);

app.listen(port, () => console.log(`Server is running to port : ${port} `));
