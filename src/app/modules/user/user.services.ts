import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NOT_FOUND, UNAUTHORIZED } from "http-status";
import AppError from "../../errors/AppErrors";
import { createToken } from "../../utils/createToken";
import { USER_ROLE } from "./user.constants";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import config from "../../config";

const getAllUserFromDB = async () => {
  const users = await UserModel.find().select("-password");
  return users;
};

const getSingleUserFromDB = async (email: string) => {
  const userInfo = await UserModel.findOne({ email }).select("-password");

  return userInfo;
};

const createUserIntoDB = async (payload: TUser) => {
  const userData = {
    ...payload,
    role: USER_ROLE.user,
  };

  const newUser = await UserModel.create(userData);

  let userToken;
  if (newUser) {
    userToken = createToken(newUser);
  }
  return userToken;
};

const createAdminIntoDB = async (id: string) => {
  const existUser = await UserModel.findById(id);
  if (!existUser) {
    throw new AppError(NOT_FOUND, "User does not exist.");
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { role: USER_ROLE.admin },
    { new: true }
  );
  let userToken;
  if (updatedUser) {
    userToken = createToken(updatedUser);
  }
  return userToken;
};

const updateUserIntoDB = async (
  payload: Record<string, string>,
  role: string,
  id: string
) => {
  const existUser = await UserModel.findById(id);
  if (!existUser) {
    throw new AppError(NOT_FOUND, "User does not exist.");
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { ...payload, role },
    { new: true }
  );
  let userToken;
  if (updatedUser) {
    userToken = createToken(updatedUser);
  }
  return userToken;
};

const loginUserWithEmailPasswordIntoDB = async (payload: Partial<TUser>) => {
  // Find user by email
  const existUser = await UserModel.findOne({ email: payload?.email });
  if (!existUser) {
    throw new AppError(NOT_FOUND, "User does not exist.");
  }

  // Compare provided password with stored password hash
  const passwordMatch = await bcrypt.compare(
    payload?.password as string,
    existUser?.password
  );
  if (!passwordMatch) {
    throw new AppError(UNAUTHORIZED, "Login failed");
  }

  // Exclude password from user data
  const { password, ...userData } = existUser.toObject();

  // Create an object for token
  const tokenData = {
    userId: existUser?._id,
    email: existUser?.email,
    role: existUser?.role,
  };

  // Create a JWT token
  const token = jwt.sign(tokenData, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });
  // Return the token and user data without the password
  return token;
};

export const UserServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
  createUserIntoDB,
  createAdminIntoDB,
  updateUserIntoDB,
  loginUserWithEmailPasswordIntoDB,
};
