import express from "express";
import type { Response } from "express";
import { addItemToCart, getCartForUser } from "../services/CartSevices.ts";
import ValidateJWT from "../medelware/ValidateJWT.ts";
import type { ExtendRequest } from "../Types/extandedRequest.ts";

const router = express.Router();

router.get("/", ValidateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;

  const cart = await getCartForUser({ userId });

  console.log("CART:", cart);
  res.status(200).send(cart);
});

// Add items to cart

router.post("/items", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quntatity } = req.body;
    const response = await addItemToCart({ userId, productId, quntatity });

    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
