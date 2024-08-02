import { dbConnect } from "@/Connection/Db";
import { userModel } from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    dbConnect();  
    const pageSize : any = req.nextUrl.searchParams.get("pageSize");
    const pageNumber : any = req.nextUrl.searchParams.get("pageNumber");
    const skip = (pageNumber - 1) * pageSize;
    const users = await userModel.find({ role: { $ne: "admin" } }).limit(pageSize).skip(skip);
    return NextResponse.json(users);
  } catch (error : any) {
    return NextResponse.json(error.message);
  }
}
