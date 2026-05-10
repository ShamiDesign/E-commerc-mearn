import { cartModel, type ICart } from "../models/CartModel.ts";
import { orderModel, type IOederItem } from "../models/OrderModel.ts";
import { productModel } from "../models/ProductModel.ts";

// Create Cart For User
interface CreateCartForUser {
  userId: string;
}
export const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

// Get Active Cart For User
interface GetCartForUser {
  userId: string;
  populateProduct?: boolean;
}
export const getCartForUser = async ({
  userId,
  populateProduct,
}: GetCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "Active" })
      .populate("item.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "Active" });
  }
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

// Clear Card
interface ClearCart {
  userId: string;
}
export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getCartForUser({ userId });
  cart.item = [];
  const updateCart = await cart.save();
  return { data: updateCart, statusCode: 200 };
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

  await cart.save();
  return {
    data: await getCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

// Update Item In Cart
interface UpdateItemInCart {
  productId: any;
  quntatity: number;
  userId: string;
}
export const updateItemInCart = async ({
  userId,
  productId,
  quntatity,
}: UpdateItemInCart) => {
  const cart = await getCartForUser({ userId });
  const existInCart = cart.item.find((p) => p.product.toString() === productId);
  if (!existInCart) {
    return { data: "Item dose not exist in the cart", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Item not found in the cart", statusCode: 400 };
  }
  if (product.stock < quntatity) {
    return { data: "Low porduct in stock", statusCode: 400 };
  }
  const OtherItemInCart = cart.item.filter(
    (p) => p.product.toString() !== productId,
  );
  let total = OtherItemInCart.reduce((sum, product) => {
    sum += product.quntatity * product.unitPrice;
    return sum;
  }, 0);
  existInCart.quntatity = quntatity;
  total += existInCart.quntatity * existInCart.unitPrice;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

// Delete Item From Cart
interface DeleteItemFromCart {
  userId: string;
  productId: any;
}
export const deleteItemFromCart = async ({
  userId,
  productId,
}: DeleteItemFromCart) => {
  const cart = await getCartForUser({ userId });
  const existInCart = cart.item.find((p) => p.product.toString() === productId);
  if (!existInCart) {
    return { data: "Item dose not exist in the cart", statusCode: 400 };
  }
  const otherItemInCart = cart.item.filter(
    (p) => p.product.toString() !== productId,
  );
  const total = otherItemInCart.reduce((sum, product) => {
    sum += product.quntatity * product.unitPrice;
    return sum;
  }, 0);
  cart.item = otherItemInCart;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

// CheckOut
interface Checkout {
  userId: string;
  addres: string;
}
export const checkout = async ({ userId, addres }: Checkout) => {
  if (!addres) {
    return { data: "Prease Add your Addres ", statusCode: 400 };
  }
  const cart = await getCartForUser({ userId });
  const orderItems: IOederItem[] = [];
  // Loop
  for (const item of cart.item) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product not found", statusCode: 400 };
    }
    const orderItem: IOederItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quntatity,
      unitPrice: item.unitPrice,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItem: orderItems,
    addres,
    userId,
    total: cart.totalAmount,
  });
  await order.save();
  cart.status = "Completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};
