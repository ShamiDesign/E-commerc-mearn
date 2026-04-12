import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/UserRout.ts";
import { seedInProducts } from "./services/ProductServices.ts";
import { productRouter } from "./routers/ProductRouter.ts";
import CartRouter from "./routers/CartRouter.ts";
const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected Mongoose"))
  .catch((error) => console.log("Faild Connected to Mongoose", error));

seedInProducts();

app.use("/User", router);
app.use("/Product", productRouter);
app.use("/Cart", CartRouter);

app.listen(port, () => console.log(`Server is running to port : ${port} `));
