import { dbConnect } from "@/Connection/Db";
import { userModel } from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    dbConnect();
    const users = await userModel
      .find({ role: { $ne: "admin" } })
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
