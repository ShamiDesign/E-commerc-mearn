import { cartModel } from "../models/CartModel.ts";

interface CreateCartForUser {
  userId: string;
}

export const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId ,totalAmount:1 });
  await cart.save();
  return cart;
};

interface GetCartForUser {
  userId: string;
}

export const getCartForUser = async ({ userId }: GetCartForUser) => {
  const cart = await cartModel.findOne({ userId, status: "Active" });
  if (!cart) {
    const cart = await createCartForUser({ userId });
    return cart;
  }
};
