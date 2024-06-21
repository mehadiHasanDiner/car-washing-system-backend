import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createAdminIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const updateUserIntoDB = async (_id: string, payload: TUser) => {
  console.log(payload);
  const result = await UserModel.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createAdminIntoDB,
  updateUserIntoDB,
};
