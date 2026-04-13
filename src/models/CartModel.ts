import mongoose, { Document, Schema, Types, type ObjectId } from "mongoose";
import type { IProduct } from "./ProductModel.ts";

const EnumStatus = ["Active", "Completed"];

export interface ICartItem  {
  product: IProduct;
  unitPrice: number;
  quntatity: number;
}

export interface ICart extends Document {
  userId: ObjectId | string;
  item: ICartItem[];
  totalAmount: number;
  status: "Active" | "Completed";
}

export const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quntatity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});


export const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  item: [cartItemSchema],
 totalAmount: { type: Number, required: true},
  status: { type: String, enum: EnumStatus, default: "Active" },
});

export const cartModel = mongoose.model<ICart>("Cart", CartSchema);
