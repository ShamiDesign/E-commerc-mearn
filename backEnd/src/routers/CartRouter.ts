import express from "express";
import type { Response } from "express";
import {
  addItemToCart,
  getCartForUser,
  clearCart,
  updateItemInCart,
  deleteItemFromCart,
  checkout,
} from "../services/CartSevices.ts";
import ValidateJWT from "../medelware/ValidateJWT.ts";
import type { ExtendRequest } from "../Types/extandedRequest.ts";

const router = express.Router();

router.get("/", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getCartForUser({ userId, populateProduct: true });
    console.log("CART:", cart);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json("Somethig went wrong!");
  }
});

// Clear Cart
router.delete("/", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Somethig went wrong!");
  }
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

// Update item To cart
router.put("/items", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quntatity } = req.body;
    const response = await updateItemInCart({ productId, userId, quntatity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Somethig went wrong!");
  }
});

//  Delete item from Cart
router.delete(
  "/items/:productId",
  ValidateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteItemFromCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("Somethig went wrong!");
    }
  },
);

// CheckOut
router.post("/checkout", ValidateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { addres } = req.body;
    const response = await checkout({ userId, addres });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Somethig went wrong!");
  }
});

export default router;
