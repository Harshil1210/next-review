import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database Connected");
  } catch (error: any) {
    throw NextResponse.json({ message: error.message });
  }
};
