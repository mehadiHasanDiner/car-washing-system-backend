import { z } from "zod";
import { USER_Role } from "./user.constants";

const createAdminValidations = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().nonempty(),
    phone: z.string().refine((val) => /^[0-9]{10,15}$/.test(val), {
      message:
        "Phone number must be 10 to 15 digits long and contain only numbers",
    }),
    role: z.nativeEnum(USER_Role).default(USER_Role.ADMIN),
    address: z.string().nonempty(),
  }),
});

const updateUserValidations = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z
      .string()
      .refine((val) => /^[0-9]{10,15}$/.test(val), {
        message:
          "Phone number must be 10 to 15 digits long and contain only numbers",
      })
      .optional(),
    role: z.nativeEnum(USER_Role).default(USER_Role.ADMIN).optional(),
    address: z.string().nonempty().optional(),
  }),
});

export const UserValidations = {
  createAdminValidations,
  updateUserValidations,
};
