import { USER_ROLE } from "./user.constants";

export type TUserRoles = keyof typeof USER_ROLE;

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRoles;
  address: string;
};
