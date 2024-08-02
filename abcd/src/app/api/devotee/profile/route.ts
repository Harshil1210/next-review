import { dbConnect } from "@/Connection/Db";
import { userModel } from "@/Models/userModel";
import { decryptUserData } from "@/middleware";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    dbConnect();
    const sessionData = req.cookies.get("session")?.value;
    let decryptedUser ;
    if(sessionData){
       decryptedUser = decryptUserData(
        sessionData,
        process.env.COOKIE_ENCRYPTION_KEY!
      );
    }
    const userId = new mongoose.Types.ObjectId(decryptedUser._id);
    const user = await userModel.findById(userId);
    if (user === null) {
      return NextResponse.json(
        { message: `user with ${userId} Id does not exist ` },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "success", user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
