"use server";
import { dbConnect } from "@/Connection/Db";
import { userModel } from "@/Models/userModel";
import { UploadFilesToBucket } from "@/Utils/s3";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";

export const createUserId = async (
  initiationDate: string,
  firstName: string,
  lastName: string
) => {
  const month = new Date(initiationDate).getMonth() + 1;
  const year = new Date(initiationDate).getFullYear();
  const first2name = firstName.slice(0, 2);
  const last2name = lastName.slice(0, 2);
  return year + "-" + first2name + "-" + last2name + "-" + month;
};

export async function logout() {
  console.log("logout called");
  cookies().delete("session");
  redirect("/login");
}

export async function login(prevState: any, formData: FormData) {
  console.log("login Action called");
  const body = Object.fromEntries(formData);

  if (body.Id === "" || body.password === "" || body.role === "") {
    return { message: "Invalid user/password/role" };
  }
  await dbConnect();
  const user = await userModel.find({ Id: body.Id });
  console.log(body, " :body");
  if (user.length === 0) {
    return {
      message: "Invalid user/password/role",
    };
  }

  const isPasswordMatch = bcrypt.compareSync(
    String(body.password),
    user[0].password
  );
  if (!isPasswordMatch) {
    return { message: "Invalid user/password/role" };
  }

  const isRoleMatch = user[0].role === body.role;
  if (!isRoleMatch) {
    return { message: "Invalid user/password/role" };
  }

  const plainUser = user[0].toObject();
  delete plainUser.password;

  const encryptedUser = CryptoJS.AES.encrypt(
    JSON.stringify(plainUser),
    process.env.COOKIE_ENCRYPTION_KEY!
  ).toString();
  cookies().set("session", encryptedUser, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  if (plainUser.role === "admin") {
    return { message: user[0] };
  } else {
    return { message: user[0] };
  }
}

export async function singup(prevState: any, formData: FormData) {
  console.log("createuser clled");
  await dbConnect();
  const body: any = Object.fromEntries(formData);
  if (
    body.firstName === "" ||
    body.lastName === "" ||
    body.middleName === "" ||
    body.email === "" ||
    body.initiationDate === "" ||
    body.flatnumber === "" ||
    body.Area === "" ||
    body.City === "" ||
    body.State === "" ||
    body.PinCode === ""
  ) {
    return false
  }
  const user = await userModel.find({ email: body.email });
  if (user.length != 0) {
    return { message: "user with this email already exists" };
  }

  const userId = await createUserId(
    body.initiationDate,
    body.firstName,
    body.lastName
  );

  console.log("user id :", userId);

  if (body.photo.name !== "undefined") {
    if (!body.photo.type.startsWith("image")) {
      return { message: "Only images can be uploaded" };
    }
    const file = await body.photo.arrayBuffer();
    UploadFilesToBucket(file, `${userId}`);
  }

  const newUser: any = await userModel.create({
    Id: userId,
    firstName: body.firstName,
    middleName: body.middleName,
    lastName: body.lastName,
    flatnumber: body.flatnumber,
    area: body.Area,
    state: body.State,
    city: body.City,
    pinCode: body.PinCode,
    email: body.email,
    password: "password",
    initiationDate: body.initiationDate,
    photo: userId,
  });

  newUser.password = newUser.hashPassword();
  const abc = await newUser.save();
  return { message: "success" };
  // redirect("/admin/userlist");
}

export async function updateUser(prevState: any, formData: FormData) {
  try {
    const body: any = Object.fromEntries(formData);
    await dbConnect();
    const user = await userModel.findById(body.user_id);
    if (user.length === 0) {
      return {
        message: `user with ${body._id} does not exist`,
      };
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      body.user_id,
      {
        $set: {
          firstName: body.firstName,
          middleName: body.middleName,
          lastName: body.lastName,
          email: body.email,
          flatnumber: body.flatnumber,
          area: body.Area,
          pinCode: body.PinCode,
          city: body.City,
          state: body.State,
        },
      },
      { new: true }
    );

    if (body.photo.name !== "undefined") {
      if (!body.photo.type.startsWith("image")) {
        return { message: "Only images can be uploaded" };
      }
      const file = await body.photo.arrayBuffer();
      UploadFilesToBucket(file, `${updatedUser.Id}`);
    }

    return { message: "success" };
  } catch (error: any) {
    return { message: `${error.message}` };
  }
}
