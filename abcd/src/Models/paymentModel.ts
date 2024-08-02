import mongoose, { Schema, model } from "mongoose";

export interface Ipayment extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  month: Number;
  year: Number;
  amount: Number;
}

const paymentSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "userId is required"],
  },
  month: {
    type: Number,
    required: [true, "month is required"],
    max: 12,
    min: 1,
  },
  year: {
    type: Number,
    required: [true, "year is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
    min: [100, "amount must be alteast 100"],
  },
});

export const paymentModel =
  mongoose.models.payment || model<Ipayment>("payment", paymentSchema);
