import { z } from "zod";
import { USER_Role } from "./user.constants";

const createAdminValidations = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().nonempty(),
    phone: z.number().int().positive(),
    role: z.nativeEnum(USER_Role).default(USER_Role.ADMIN),
    address: z.string().nonempty(),
  }),
});

export const UserValidations = {
  createAdminValidations,
};
