import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createAdminIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

export const UserServices = {
  createAdminIntoDB,
};

// vieo: 8-8
