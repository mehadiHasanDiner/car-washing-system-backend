import { z } from "zod";
import { USER_ROLE } from "./user.constants";

const createAdminValidations = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().nonempty(),
    phone: z.string().refine((val) => /^[0-9]{10,15}$/.test(val), {
      message:
        "Phone number must be 10 to 15 digits long and contain only numbers",
    }),
    role: z.nativeEnum(USER_ROLE),
    address: z.string().nonempty(),
  }),
});

const updateUserValidations = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    address: z.string().optional(),
  }),
});

export const UserValidations = {
  createAdminValidations,
  updateUserValidations,
};
