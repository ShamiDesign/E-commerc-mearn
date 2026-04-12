import mongoose, { Document, Schema, type ObjectId } from "mongoose";
import type { IProduct } from "./ProductModel.ts";

const EnumStatus = ["Active", "Combleted"];
export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  quntatity: number;
}
export const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  unitPrice: { type: Number, required: true },
  quntatity: { type: Number, required: true, default: 1 },
});

export interface ICart extends Document {
  userId: ObjectId | string;
  item: IProduct[];
  totalAmount: number;
  status: "Active" | "Combleted";
}
export const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  item: [cartItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: EnumStatus, default: "Active" },
});

export const cartModel = mongoose.model<ICart>("Cart", CartSchema);
