import { dbConnect } from "@/Connection/Db";
import { userModel } from "@/Models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  try {
   await dbConnect();
    const isValid = mongoose.Types.ObjectId.isValid(params.userId);
    if (!isValid) {
      return NextResponse.json(
        { message: `user with that id does not exist` },
        { status: 400 }
      );
    }
    const userId = new mongoose.Types.ObjectId(params.userId);
    const user = await userModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: `user with ${userId} id does not exist` },
        { status: 400 }
      );
    }
    const deletedUser = await userModel.findByIdAndDelete(userId);
    return NextResponse.json(
      { message: "Success", deletedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
