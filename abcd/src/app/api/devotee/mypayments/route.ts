import { dbConnect } from "@/Connection/Db";
import { paymentModel } from "@/Models/paymentModel";
import { decryptUserData } from "@/middleware";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    dbConnect()
     const sessionData = req.cookies.get("session")?.value;
     let decryptedUser;
     if (sessionData) {
       decryptedUser = decryptUserData(
         sessionData,
         process.env.COOKIE_ENCRYPTION_KEY!
       );
     }
    const payments = await paymentModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(decryptedUser._id),
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            month: "$month",
            year: "$year",
          },
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $lookup: {
          as: "user",
          from: "users",
          foreignField: "_id",
          localField: "_id.userId",
        },
      },
      {
        $addFields: {
          user: {
            $arrayElemAt: ["$user", 0],
          },
        },
      },
    ]);
    return NextResponse.json({ message: "success", payments });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
