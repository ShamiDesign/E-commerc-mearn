import { cartModel } from "../models/CartModel.ts";
import { productModel } from "../models/ProductModel.ts";

export const createCartForUser = async ({ userId }: GetCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetCartForUser {
  userId: string;
}

export const getCartForUser = async ({ userId }: GetCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "Active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

// Add item to cart
interface AddItemToCart {
  productId: any;
  quntatity: number;
  userId: string;
}
export const addItemToCart = async ({
  productId,
  quntatity,
  userId,
}: AddItemToCart) => {
  const cart = await getCartForUser({ userId });
  const existInCart = cart.item.find((p) => p.product.toString() === productId);
  if (existInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }
  if (product.stock < quntatity) {
    return { data: "Low product in stok", statusCode: 400 };
  }
  cart.item.push({
    product: productId,
    unitPrice: product.price,
    quntatity,
  });
  cart.totalAmount += product.price * quntatity;

  const updateCart = await cart.save();
  return { data: updateCart, statusCode: 200 };
};
