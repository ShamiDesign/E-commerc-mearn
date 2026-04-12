import express from "express";
import type { Request, Response } from "express";
import { getCartForUser } from "../services/CartSevices.ts";
import ValidateJWT from "../medelware/ValidateJWT.ts";

interface ExtendRequest extends Request {
  user?: any;
}

const router = express.Router();

router.get("/", ValidateJWT, async (req: ExtendRequest, res: Response) => {
  const userId = req.user._id;
  const cart = await getCartForUser({ userId  });
  res.status(200).send(cart);
});

export default router;
