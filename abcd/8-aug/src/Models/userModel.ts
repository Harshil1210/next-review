import mongoose, { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser {
  _id: string;
  Id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  photo: string;
  flatnumber: string;
  area: string;
  pinCode: string;
  city: string;
  state: string;
  role: string;
  password: string;
  initiationDate: Date;
  active : boolean;
}

interface IUserMethods {
  hashPassword(): string;
  fullName(): string;
  createUserId(): string;
  comparePassword() : boolean;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    Id: { type: String, required: false },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [15, "First name must be at most 15 characters long"],
      trim: true,
    },
    middleName: {
      type: String,
      required: [true, "Middle name is required"],
      minlength: [3, "Middle name must be at least 3 characters long"],
      maxlength: [15, "Middle name must be at most 15 characters long"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [15, "Last name must be at most 15 characters long"],
      trim: true,
    },
    photo: String,
    flatnumber: {
      type: String,
      required: [true, "Flat number is required"],
      trim: true,
    },
    area: { type: String, required: [true, "Area is required"], trim: true },
    state: { type: String, required: [true, "State is required"], trim: true },
    city: { type: String, required: [true, "City is required"], trim: true },
    pinCode: {
      type: String,
      required: [true, "Pincode is required"],
      minlength: [6, "PinCode must contain atleast 6 character"],
      maxlength: [6, "PinCode must not contain more than 6 character"],
    },
    role: {
      type: String,
      enum: ["admin", "devotee"],
      default: "devotee",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (value: any) {
          return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
        },
        message: (props: any) => `${props.value} is not a valid email`,
      },
    },
    password: { type: String, required: [true, "Password is required"] },
    initiationDate: {
      type: Date,
      required: [true, "Initiation date is required"],
    },
  },
  { timestamps: true }
);

userSchema.method("hashPassword", function hashPassword(this: any) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(this.password,salt)
});

userSchema.method("fullName", function fullName(this: any) {
  return this.firstName + " " + this.lastName;
});

userSchema.method("createUserId",function createUserId(this: any){
   const month = new Date(this.initiationDate).getMonth() + 1;
   const year = new Date(this.initiationDate).getFullYear();
   const first2name = this.firstName.slice(0, 2);
   const last2name = this.lastName.slice(0, 2);
   return year + "-" + first2name + "-" + last2name + "-" + month; 
})

userSchema.method("comparePassword",function comparePassword(password : string){
  return bcrypt.compareSync(password,this.password)
})

export const userModel = mongoose.models.user || model<IUser, UserModel>("user", userSchema);
