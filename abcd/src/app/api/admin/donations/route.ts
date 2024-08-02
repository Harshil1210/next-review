import { dbConnect } from "@/Connection/Db";
import { paymentModel } from "@/Models/paymentModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    dbConnect();
    const donations = await paymentModel.aggregate([
      {
        $group: {
          _id: {
            userId: "$userId",
            month: "$month",
            year: "$year",
          },
          totalAmount: {
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
    return NextResponse.json({ message: "success", donations });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
