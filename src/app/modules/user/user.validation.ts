import { z } from "zod";
import { USER_ROLE } from "./user.constants";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }),
    email: z
      .string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a valid email address.",
      })
      .email(),
    password: z.string({ required_error: "Password is required." }),
    phone: z.string({ required_error: "Phone is required." }),
    address: z.string({ required_error: "Address is required." }),
  }),
});

const updateUserValidations = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.nativeEnum(USER_ROLE),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a valid email address.",
      })
      .email(),
    password: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidations,
  loginUserValidationSchema,
};
