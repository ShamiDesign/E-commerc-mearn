import express from "express";
import mongoose from "mongoose";
import {router} from "./routers/UserRout.ts"

const app = express();
const port = 3001;
app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected Mongoose"))
  .catch((error) => console.log("Faild Connected to Mongoose", error));


app.use("/user" , router)
app.listen(port, () => console.log(`Server is running to port : ${port} `));
