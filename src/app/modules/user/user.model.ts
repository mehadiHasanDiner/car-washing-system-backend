import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcryptjs from "bcryptjs";
import config from "../../config";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  phone: {
    type: String,
    required: [true, "Please enter a valid phone number"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(user.password, Number(config.salt_round));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const UserModel = model<TUser>("User", userSchema);
