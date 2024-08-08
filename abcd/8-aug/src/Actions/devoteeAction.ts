"use server";
import { dbConnect } from "@/Connection/Db";
import { paymentModel } from "@/Models/paymentModel";
import { userModel } from "@/Models/userModel";
import { Inputs } from "@/app/devotee/payonline/page";
import { decryptUserData } from "@/middleware";
import { cookies } from "next/headers";

// export async function payonline(prevState: any, formData: FormData) {
//   try {
//     await dbConnect();
//     const body = Object.fromEntries(formData);
//     const sessionData = cookies().get("session")?.value;
//     let decryptedUser;
//     if (sessionData) {
//       decryptedUser = decryptUserData(
//         sessionData,
//         process.env.COOKIE_ENCRYPTION_KEY!
//       );
//     }
//     const user = await userModel.findById(decryptedUser._id);

//     if (user.length === 0) {
//       return { message: "user not found" };
//     }

//     const initiationDate = user.initiationDate;
//     const initMonth = new Date(initiationDate).getMonth() + 1;
//     const initYear = new Date(initiationDate).getFullYear();
//     const paymentMonth = new Date(String(body.month)).getMonth() + 1;
//     const paymentYear = new Date(String(body.year)).getFullYear();

//     if (
//       paymentYear < initYear ||
//       (paymentYear === initYear && paymentMonth < initMonth)
//     ) {
//       return { message: "You cannot make payment for this year and month" };
//     }

//     await paymentModel.create({
//       userId: decryptedUser._id,
//       month: body.month,
//       year: body.year,
//       amount: body.amount,
//     });
//     return { message: "success" };
//   } catch (error: any) {
//     return { message: error.message };
//   }
// }

export async function payonline(formData: Inputs) {
  try {
    await dbConnect();
    // const body = Object.fromEntries(formData);
    const sessionData = cookies().get("session")?.value;
    let decryptedUser;
    if (sessionData) {
      decryptedUser = decryptUserData(
        sessionData,
        process.env.COOKIE_ENCRYPTION_KEY!
      );
    }
    const user = await userModel.findById(decryptedUser._id);

    if (user.length === 0) {
      return { message: "user not found" };
    }

    const initiationDate = user.initiationDate;
    const initMonth = new Date(initiationDate).getMonth() + 1;
    const initYear = new Date(initiationDate).getFullYear();
    const paymentMonth = new Date(String(formData.month)).getMonth() + 1;
    const paymentYear = new Date(String(formData.year)).getFullYear();

    if (
      paymentYear < initYear ||
      (paymentYear === initYear && paymentMonth < initMonth)
    ) {
      return { message: "You cannot make payment for this year and month" };
    }

    await paymentModel.create({
      userId: decryptedUser._id,
      month: formData.month,
      year: formData.year,
      amount: formData.amount,
    });
    return { message: "success" };
  } catch (error: any) {
    return { message: error.message };
  }
}