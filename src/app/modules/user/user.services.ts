import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createAdminIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const updateUserIntoDB = async (_id:string, payload: TUser) => {
  const result = await UserModel.create({ _id }, payload);
  return result;
};

export const UserServices = {
  createAdminIntoDB,
  updateUserIntoDB,
};

// vieo: 8-8
