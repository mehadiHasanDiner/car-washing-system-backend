import { Schema, model, connect } from "mongoose";
import { TUser } from "./user.interface";
import { USER_Role } from "./user.constants";

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
    type: Number,
    required: [true, "Please enter a valid phone number"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: Object.keys(USER_Role),
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

export const UserModel = model<TUser>("User", userSchema);

