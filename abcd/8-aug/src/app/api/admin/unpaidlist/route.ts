import { userModel } from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    const unpaidUsers = await userModel.aggregate([
      {
        $lookup: {
          as: "payments",
          from: "payments",
          foreignField: "userId",
          localField: "_id",
        },
      },
      {
        $addFields: {
          hasPaid: {
            $in: [
              true,
              {
                $map: {
                  input: "$payments",
                  as: "payment",
                  in: {
                    $and: [
                      {
                        $eq: ["$$payment.year", currYear],
                      },
                      {
                        $eq: ["$$payment.month", currMonth],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
      {
        $match: {
          hasPaid: {
            $ne: true,
          },
        },
      },
      {
        $project: {
          payments: 0,
          hasPaid: 0,
        },
      },
    ]);

    return NextResponse.json({ message: "success", unpaidUsers },{status : 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message },{status : 500});
  }
}
