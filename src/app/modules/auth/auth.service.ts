import config from "../../config";
import { USER_ROLE } from "../user/user.constants";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.utils";
import jwt from "jsonwebtoken";

const signUpIntoDB = async (payload: TUser): Promise<any> => {
  const user = await UserModel.findOne({ email: payload.email });
  if (user) {
    throw new Error("User already exists");
  }
  //   set user role
  payload.role = USER_ROLE.user;

  const newUser = await UserModel.create(payload);

  return newUser;
};

const loginIntoDB = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!user) {
    throw new Error("User Not Found");
  }

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_secret_expires_in,
  });

  return { accessToken };
};

export const AuthServices = {
  signUpIntoDB,
  loginIntoDB,
};
