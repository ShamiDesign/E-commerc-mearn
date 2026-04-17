import mongoose, { Document, Schema, type ObjectId } from "mongoose";

export interface IOederItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}
export interface IOrder extends Document {
  orderItem: IOederItem[];
  userId: ObjectId | string;
  addres: string;
  total: number;
}

const orderItemSchema = new Schema<IOederItem>({
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
  orderItem: [orderItemSchema],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  addres: { type: String, required: true },
  total: { type: Number, required: true },
});

export const orderModel = mongoose.model<IOrder>("Order", orderSchema);
