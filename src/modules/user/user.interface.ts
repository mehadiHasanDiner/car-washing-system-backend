import { USER_Role } from "./user.constants";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: number;
  role: keyof typeof USER_Role;
  address: string;
};
